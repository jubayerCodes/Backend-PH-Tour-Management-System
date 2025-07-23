import bcrypt from "bcryptjs"
import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from 'http-status-codes'
import { generateToken } from "../../utils/jwr"
import { envVars } from "../../config/env"

const credentialsLogin = async (payload: Pick<IUser, "email" | "password">) => {
    const { email, password } = payload

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }

    const { password: hashedPassword } = existingUser

    const isPasswordMatched = await bcrypt.compare(password as string, hashedPassword as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    }

    console.log(jwtPayload);
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_EXPIRES_IN)

    return { accessToken }
}

export const AuthServices = {
    credentialsLogin
}
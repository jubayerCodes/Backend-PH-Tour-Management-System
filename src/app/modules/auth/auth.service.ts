import bcrypt from "bcryptjs"
import AppError from "../../errorHelpers/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from 'http-status-codes'

const credentialsLogin = async (payload: Pick<IUser, "email" | "password">) => {
    const { email, password } = payload

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }

    const { password: hashedPassword, ...rest } = existingUser

    const isPasswordMatched = await bcrypt.compare(password as string, hashedPassword as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    return {
        ...rest
    }
}

export const authServices = {
    credentialsLogin
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Logged In Successfully",
        data: result
    })
})

export const AuthControllers = {
    credentialsLogin
}
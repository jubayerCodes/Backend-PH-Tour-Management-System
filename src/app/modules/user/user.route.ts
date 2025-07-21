import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

export const UserRoutes = Router()

UserRoutes.get('/', UserControllers.getAllUsers)
UserRoutes.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser)
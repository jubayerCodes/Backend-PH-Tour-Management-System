import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

export const UserRoutes = Router()

UserRoutes.get('/', checkAuth(Role.ADMIN), UserControllers.getAllUsers)
UserRoutes.post('/register', validateRequest(createUserZodSchema), UserControllers.createUser)
UserRoutes.patch('/:id', checkAuth(...Object.values(Role)), validateRequest(updateUserZodSchema), UserControllers.updateUser)
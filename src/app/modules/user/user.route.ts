import { Router } from "express";
import { UserControllers } from "./user.controller";

export const UserRoutes = Router()

UserRoutes.get('/', UserControllers.getAllUsers)
UserRoutes.post('/register', UserControllers.createUser)
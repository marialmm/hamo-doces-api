import {Router} from "express";

import { validateJoi } from "../config/middlewares/joiValidationMiddleware.js";
import { signupSchema } from "../schemas/userSchemas.js";
import * as userController from "../controllers/userController.js"

const userRouter = Router();

userRouter.post("/signup", validateJoi(signupSchema), userController.signup);

export default userRouter;
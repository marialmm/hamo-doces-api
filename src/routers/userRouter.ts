import { Router } from "express";

import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { signinSchema, signupSchema } from "../schemas/userSchemas.js";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", validateJoi(signupSchema), userController.signup);
userRouter.post("/signin", validateJoi(signinSchema), userController.signin);

export default userRouter;

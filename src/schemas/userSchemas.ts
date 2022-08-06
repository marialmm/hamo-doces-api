import { User } from "@prisma/client";
import Joi from "joi";

import { CreateUserBody } from "../controllers/userController";
import { SigninData } from "../repositories/userRepository";

export const signupSchema = Joi.object<CreateUserBody>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("ADMIN", "CLIENT").required(),
    adminPassword: Joi.string().required(),
});

export const signinSchema = Joi.object<SigninData>({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

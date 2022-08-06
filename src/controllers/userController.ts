import { User } from "@prisma/client";
import { request, Request, Response } from "express";
import { SigninData } from "../repositories/userRepository.js";

import * as userService from "../services/userService.js";

export type CreateUserBody = Omit<User, "id"> & {
    role: "ADMIN" | "CLIENT";
    adminPassword: string;
};

export async function signup(req: Request, res: Response) {
    const userData: CreateUserBody = req.body;

    await userService.signup(userData);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
    const userData: SigninData = req.body;

    const userInfo = await userService.signin(userData);

    res.send(userInfo);
}
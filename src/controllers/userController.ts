import { User } from "@prisma/client";
import { request, Request, Response } from "express";

import * as userService from "../services/userService.js";

export type CreateUserBody = Omit<User, "id" & "roleId"> & {
    role: "ADMIN" | "CLIENT";
    adminPassword: string;
};

export async function signup(req: Request, res: Response) {
    const userData = req.body;

    await userService.signup(userData);

    res.sendStatus(200);
}

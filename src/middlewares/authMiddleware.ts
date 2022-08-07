import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { unauthorizedError } from "../utils/errorUtils.js";
import * as userRepository from "../repositories/userRepository.js";

dotenv.config();

type TokenData = {
    userId: number;
};

export async function validateToken(req: Request, res: Response, next: NextFunction) {
    const authorization: string = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    try {
        const secret = process.env.JWT_SECRET_KEY;
        const tokenData = jwt.verify(token, secret) as TokenData;

        if (!token || !tokenData) {
            throw unauthorizedError("Invalid token");
        }

        const user = await checkUserExists(tokenData.userId);
        res.locals.user = user;
        next();
    } catch (e) {
        throw unauthorizedError("Invalid token");
    }
}

async function checkUserExists(userId: number) {
    const user = await userRepository.getById(userId);

    if (!user) {
        throw unauthorizedError("User does not exist");
    }

    return user;
}

export function validateUserAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = res.locals.user;

    if (user.role.name !== "ADMIN") {
        throw unauthorizedError();
    }

    next();
}

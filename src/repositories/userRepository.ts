import { User } from "@prisma/client";
import prisma from "../config/database.js";

type CreateUserData = Omit<User, "id">;

export async function create(userData: CreateUserData) {
    await prisma.user.create({
        data: userData,
    });
}

export async function getByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: { email },
    });

    return user;
}

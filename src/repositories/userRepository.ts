import { User } from "@prisma/client";
import prisma from "../config/database.js";

type CreateUserData = Omit<User, "id">;
export type SigninData = {
    email: string;
    password: string;
};

export async function create(userData: CreateUserData) {
    await prisma.user.create({
        data: userData,
    });
}

export async function getByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: { email },
        include: {
            role: {
                select: {
                    name: true,
                },
            },
        },
    });

    return user;
}

export async function getById(id: number) {
    const user = await prisma.user.findFirst({
        where: { id },
        include: {
            role: {
                select: { name: true },
            },
        },
    });

    return user;
}

export async function getClientByName(name: string) {
    const client = await prisma.user.findFirst({
        where: {
            name,
            role: {
                name: "CLIENT",
            },
        },
    });

    return client;
}

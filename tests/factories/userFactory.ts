import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "../../src/config/database";
import { CreateUserBody } from "../../src/controllers/userController";

export function createUserData() {
    const user: CreateUserBody = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
        role: "CLIENT",
        adminPassword: "-",
        roleId: 1,
    };

    return user;
}

export async function insertUser(userData: User) {
    const SALT = +process.env.SALT
    userData.password = bcrypt.hashSync(userData.password, SALT);
    await prisma.user.create({
        data: userData,
    });
}

import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const SALT = +process.env.SALT;
    userData.password = bcrypt.hashSync(userData.password, SALT);
    await prisma.user.create({
        data: userData,
    });
}

export async function insertUserAndCreateToken(role: string) {
    const userData = createUserData();
    if (role === "CLIENT") {
        userData.roleId = 1;
    } else if (role === "ADMIN") {
        userData.roleId = 2;
    }
    delete userData.role;
    delete userData.adminPassword;

    await insertUser({ ...userData, id: 1 });

    const secret = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ userId: 1 }, secret);
    return token;
}

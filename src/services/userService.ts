import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { CreateUserBody } from "../controllers/userController.js";
import {
    badRequesError,
    conflictError,
    unauthorizedError,
} from "../utils/errorUtils.js";
import * as userRepository from "../repositories/userRepository.js";
import * as roleRepository from "../repositories/roleRepository.js";

dotenv.config();

export async function signup(userData: CreateUserBody) {
    await checkEmailAlreadyExists(userData.email);

    const roleId = await getRoleId(userData.role);
    userData.roleId = roleId;

    if (userData.role === "ADMIN") {
        validateAdminPassword(userData.adminPassword);
    }

    userData.password = encryptPassword(userData.password);

    delete userData.adminPassword;
    delete userData.role;

    await userRepository.create({ ...userData, roleId });
}

async function checkEmailAlreadyExists(email: string) {
    const user = await userRepository.getByEmail(email);

    if (user) {
        throw conflictError("Email already exists");
    }
}

function validateAdminPassword(password: string) {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (password !== ADMIN_PASSWORD) {
        throw unauthorizedError();
    }
}

async function getRoleId(roleName: string) {
    const role = await roleRepository.getByName(roleName);

    if (!role) {
        throw badRequesError("Invalid role");
    }

    return role.id;
}

function encryptPassword(password: string) {
    const SALT = +process.env.SALT;
    const passwordHash = bcrypt.hashSync(password, SALT);
    return passwordHash;
}

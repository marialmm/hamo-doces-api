import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function signin(userData: userRepository.SigninData) {
    const user = await userRepository.getByEmail(userData.email);

    if (!user) {
        throw unauthorizedError("Invalid email or password");
    }

    validatePassword(userData.password, user.password);

    const token = generateToken(user.id);

    return {
        token,
        name: user.name,
        role: user.role.name,
    };
}

function validatePassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash)) {
        throw unauthorizedError("Invalid email or password");
    }
}

function generateToken(userId: number) {
    const secret = process.env.JWT_SECRET_KEY;
    const expireDate = 60 * 60 * 24 * 7;
    const config = {
        expiresIn: expireDate,
    };

    const token = jwt.sign({ userId }, secret, config);
    return token;
}

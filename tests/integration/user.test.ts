import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import * as userFactory from "../factories/userFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

describe("POST /signup tests", () => {
    it("Given a valid input, should return 201 and create a new user", async () => {
        const userData = userFactory.createUserData();
        delete userData.roleId;

        const response = await supertest(app).post("/signup").send(userData);

        expect(response.statusCode).toEqual(201);
        const user = await prisma.user.findFirst({
            where: { name: userData.name },
        });

        expect(user.name).toEqual(userData.name);
        expect(user.email).toEqual(userData.email);
        expect(user.password).not.toEqual(userData.password);
    });

    it("Given an invalid input, should return 422 and fail to create a new user", async () => {
        const userData = {};

        const response = await supertest(app).post("/signup").send(userData);

        expect(response.statusCode).toEqual(422);

        const user = await prisma.user.findMany();

        expect(user.length).toEqual(0);
    });
});

describe("POST /signin tests", () => {
    it("Given a valid input, should return 200 and an object with token, name and role", async () => {
        const userData = userFactory.createUserData();
        delete userData.role;
        delete userData.adminPassword;

        await userFactory.insertUser({ ...userData, id: 1 });
        const signinData = {
            email: userData.email,
            password: userData.password,
        };

        const response = await supertest(app).post("/signin").send(signinData);

        expect(response.statusCode).toEqual(200);

        const keys = ["token", "name", "role"];

        expect(Object.keys(response.body)).toEqual(keys);
    });

    it("Given an invalid input, should return 422", async () => {
        const loginData = {};

        const response = await supertest(app).post("/signin").send(loginData);

        expect(response.statusCode).toEqual(422);
    })
});

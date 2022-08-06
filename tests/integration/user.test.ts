import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import * as userFactory from "../factories/userFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

describe("Signup tests", () => {
    it("Given a valid input, should return 201 and create a new user", async () => {
        const userData = userFactory.createUserData();

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

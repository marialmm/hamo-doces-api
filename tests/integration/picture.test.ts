import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/database.js";
import * as userFactory from "../factories/userFactory.js";
import * as productFactory from "../factories/productFactory.js";
import * as pictureFactory from "../factories/pictureFactory.js";
import * as themeFactory from "../factories/themeFactory.js";

beforeEach(async () => {
    await prisma.$executeRaw`
    TRUNCATE TABLE users, pictures, products, themes 
    RESTART IDENTITY 
    CASCADE`;
});

describe("POST /pictures tests", () => {
    it("Given a valid input, should create a picture and return 201", async () => {
        const token = await userFactory.insertUserAndCreateToken("ADMIN");
        const productData = productFactory.createProductData();
        await productFactory.insertProduct(productData);

        const pictureData = pictureFactory.createPictureData(productData.name);

        delete pictureData.productId;

        const response = await supertest(app)
            .post("/pictures")
            .send(pictureData)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(201);

        const picture = await prisma.picture.findFirst({
            where: {
                id: 1,
            },
        });
        expect(picture.description).toEqual(pictureData.description);
        expect(picture.isMain).toEqual(pictureData.isMain);
        expect(picture.pictureUrl).toEqual(pictureData.pictureUrl);
    });

    it("Given an invalid input, should return 422 and fail to create a picture", async () => {
        const token = await userFactory.insertUserAndCreateToken("ADMIN");

        const response = await supertest(app)
            .post("/pictures")
            .send({})
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(422);

        const picture = await prisma.picture.findFirst({});

        expect(picture).toBeNull();
    });

    it("Given an invalid token, should return 401 and fail to create a picture", async () => {
        const token = "";
        const productData = productFactory.createProductData();
        await productFactory.insertProduct(productData);

        const pictureData = pictureFactory.createPictureData(productData.name);

        delete pictureData.productId;

        const response = await supertest(app)
            .post("/pictures")
            .send(pictureData)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(401);

        const picture = await prisma.picture.findFirst({});

        expect(picture).toBeNull();
    });

    it("Given a token from a CLIENT user, should return 401 and fail to create a picture", async () => {
        const token = await userFactory.insertUserAndCreateToken("CLIENT");
        const productData = productFactory.createProductData();
        await productFactory.insertProduct(productData);

        const pictureData = pictureFactory.createPictureData(productData.name);

        delete pictureData.productId;

        const response = await supertest(app)
            .post("/pictures")
            .send(pictureData)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.statusCode).toEqual(401);

        const picture = await prisma.picture.findFirst({});

        expect(picture).toBeNull();
    });
});

describe("GET /pictures tests", () => {
    it("Should return an array with the pictures", async () => {
        await pictureFactory.insertPictureAndThemeAndProduct();

        const response = await supertest(app)
            .get("/pictures");

        expect(response.body).not.toBeUndefined();
    });
});

import { faker } from "@faker-js/faker";
import { Picture } from "@prisma/client";
import prisma from "../../src/config/database";

import { InsertPictureBody } from "../../src/controllers/pictureController";
import * as productFactory from "./productFactory.js";
import * as themeFactory from "./themeFactory.js";

export function createPictureData(product: string) {
    const pictureData: InsertPictureBody = {
        description: faker.lorem.sentence(),
        isMain: true,
        product: product,
        productId: 1,
        themes: [faker.lorem.words()],
        pictureUrl: faker.internet.url(),
    };

    return pictureData;
}

export async function insertPictureAndThemeAndProduct() {
    const productData = productFactory.createProductData();
    await productFactory.insertProduct(productData);

    const pictureData = createPictureData(productData.name);
    await themeFactory.insertTheme(pictureData.themes[0]);
    delete pictureData.product;
    delete pictureData.themes;

    await insertPicture({ ...pictureData, id: 1 });
    await insertThemePicture();
}

async function insertPicture(pictureData: Picture) {
    await prisma.picture.create({
        data: pictureData,
    });

    await prisma.themePicture.create({
        data: {
            pictureId: 1,
            themeId: 1,
        },
    });
}

async function insertThemePicture() {
    await prisma.themePicture.create({
        data: {
            themeId: 1,
            pictureId: 1,
        },
    });
}

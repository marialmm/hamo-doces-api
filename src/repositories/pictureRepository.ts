import { Picture } from "@prisma/client";

import prisma from "../config/database.js";

type InsertPictureData = Omit<Picture, "id">;

export async function insert(pictureData: InsertPictureData) {
    const picture = await prisma.picture.create({
        data: pictureData,
    });

    return picture.id;
}

export async function getMainByProduct(productId: number) {
    const picture = await prisma.picture.findFirst({
        where: {
            isMain: true,
            productId,
        },
    });

    return picture;
}

export async function insertThemesPicture(themesPicture) {
    await prisma.themePicture.createMany({
        data: themesPicture,
    });
}

export async function getAll(filter: string) {
    const pictures = await prisma.$queryRawUnsafe(
        `SELECT p.id, p."pictureUrl" FROM pictures AS p JOIN "themesPictures" t ON t."pictureId" = p.id ${filter};`
    );

    return pictures;
}

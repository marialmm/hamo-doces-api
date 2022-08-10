import { Product } from "@prisma/client";
import prisma from "../config/database.js";

export async function getByName(name: string) {
    const product = await prisma.product.findFirst({
        where: { name },
    });
    return product;
}

export async function getForFilter() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return products;
}

export type CreateProductData = Omit<Product, "id">;

export async function create(productData: CreateProductData) {
    await prisma.product.create({
        data: productData,
    });
}

export async function getAll() {
    const products = await prisma.product.findMany({
        select: {
            picture: {
                where: {
                    isMain: true,
                },
                select: {
                    pictureUrl: true
                }
            },
            id: true,
            name: true,
            price: true,
        },
    });

    return products;
}

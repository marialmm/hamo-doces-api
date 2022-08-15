import { faker } from "@faker-js/faker";
import prisma from "../../src/config/database";
import { CreateProductData } from "../../src/repositories/productRepository";

export function createProductData() {
    const product: CreateProductData = {
        description: faker.lorem.sentence(),
        name: faker.lorem.sentence(),
        price: 10000,
    };

    return product;
}

export async function insertProduct(productData: CreateProductData) {
    await prisma.product.create({
        data: productData,
    });
}

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

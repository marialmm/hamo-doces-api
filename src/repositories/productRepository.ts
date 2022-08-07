import prisma from "../config/database.js";

export async function getByName(name: string) {
    const product = await prisma.product.findFirst({
        where: { name },
    });
    return product;
}

import prisma from "../config/database.js";

export async function getByName(name: string) {
    const role = await prisma.role.findFirst({
        where: { name },
    });
    return role;
}

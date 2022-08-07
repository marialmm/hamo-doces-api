import prisma from "../config/database.js";

export async function getOrCreate(name: string) {
    const theme = await prisma.theme.upsert({
        where: { name },
        update: {},
        create: { name },
    });

    return theme;
}

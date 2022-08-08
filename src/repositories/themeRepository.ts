import { transformDocument } from "@prisma/client/runtime/index.js";
import prisma from "../config/database.js";

export async function getOrCreate(name: string) {
    const theme = await prisma.theme.upsert({
        where: { name },
        update: {},
        create: { name },
    });

    return theme;
}

export async function getAll() {
    const themes = await prisma.theme.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return themes;
}

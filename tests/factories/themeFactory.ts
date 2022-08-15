import prisma from "../../src/config/database";

export async function insertTheme(theme: string) {
    await prisma.theme.create({
        data: {
            name: theme,
        },
    });
}

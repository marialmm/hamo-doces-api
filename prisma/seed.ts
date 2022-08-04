import prisma from "../src/config/database.js";

async function main() {
    await insertRoles();
}

async function insertRoles() {
    const roles = [
        {
            id: 1,
            name: "CLIENT",
        },
        {
            id: 2,
            name: "ADMIN",
        },
    ];

    roles.forEach(async (role) => {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {},
            create: role,
        });
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

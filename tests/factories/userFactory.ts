import { faker } from "@faker-js/faker";

export function createUserData() {
    const user = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
        role: "CLIENT",
        adminPassword: "-",
    };

    return user;
}

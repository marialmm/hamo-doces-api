import { faker } from "@faker-js/faker";
import { CreateUserBody } from "../../src/controllers/userController";

export function createUserData() {
    const user: CreateUserBody = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(10),
        role: "CLIENT",
        adminPassword: "-",
        roleId: 0,
    };

    return user;
}

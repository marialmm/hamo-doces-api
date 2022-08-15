import { faker } from "@faker-js/faker";
import { InsertPictureBody } from "../../src/controllers/pictureController";

export function createPictureData(product: string) {
    const pictureData: InsertPictureBody = {
        description: faker.lorem.sentence(),
        isMain: true,
        product: product,
        productId: 1,
        themes: [faker.lorem.words()],
        pictureUrl: faker.internet.url(),
    };

    return pictureData;
}

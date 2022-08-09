import { InsertPictureBody } from "../controllers/pictureController.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";
import * as pictureRepository from "../repositories/pictureRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import * as themeRepository from "../repositories/themeRepository.js";

export async function insert(pictureData: InsertPictureBody) {
    const { product, themes } = pictureData;
    const productId = await getProductId(product);
    pictureData.productId = productId;

    if (pictureData.isMain) {
        await checkProductAlreadyHasAMainPicture(productId);
    }

    delete pictureData.product;
    delete pictureData.themes;

    const pictureId = await pictureRepository.insert(pictureData);

    await insertThemesPicture(pictureId, themes);
}

async function getProductId(product: string) {
    const productInfo = await productRepository.getByName(product);

    if (!productInfo) {
        throw notFoundError("Product not found");
    }

    return productInfo.id;
}

async function checkProductAlreadyHasAMainPicture(productId: number) {
    const picture = await pictureRepository.getMainByProduct(productId);

    if (picture) {
        throw conflictError("Product already has a main picture");
    }
}

async function getThemeId(theme: string) {
    const themeInfo = await themeRepository.getOrCreate(theme);
    return themeInfo.id;
}

async function insertThemesPicture(pictureId: number, themes: string[]) {
    const themesPicture = [];

    for (let i = 0; i < themes.length; i++) {
        const theme = themes[i];
        const id = await getThemeId(theme);
        themesPicture.push({
            themeId: id,
            pictureId,
        });
    }

    await pictureRepository.insertThemesPicture(themesPicture);
}

export async function getAll(theme?: number, product?: number) {
    const filter = selectFilter(theme, product);

    const pictures = await pictureRepository.getAll(filter);

    return pictures;
}

function selectFilter(theme?: number, product?: number) {
    const filter = ["WHERE"];
    if (!isNaN(theme) && !isNaN(product)) {
        filter.push(`t."themeId"=${theme} AND p."productId"=${product}`);
    } else if (isNaN(theme) && !isNaN(product)) {
        filter.push(`p."productId"=${product}`);
    } else if (!isNaN(theme) && isNaN(product)) {
        filter.push(`t."themeId"=${theme}`);
    } else {
        filter.pop();
    }

    return filter.join(" ");
}

export async function getById(id: number) {
    const picture = await pictureRepository.getById(id);

    if (!picture) {
        throw notFoundError("Picture not found");
    }

    const themes = [];

    picture.themesPicture.forEach((theme) => {
        themes.push(theme.theme);
    });

    picture.themesPicture = themes;

    return picture;
}

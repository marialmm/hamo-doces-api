import * as productRepository from "../repositories/productRepository.js";
import { conflictError } from "../utils/errorUtils.js";

export async function getForFilter() {
    const products = await productRepository.getForFilter();

    return products;
}

export async function create(productData: productRepository.CreateProductData) {
    const { name } = productData;

    await checkProductAlreadyExists(name);

    await productRepository.create(productData);
}

async function checkProductAlreadyExists(name: string) {
    const product = await productRepository.getByName(name);

    if (product) {
        throw conflictError("Product already exists");
    }
}

export async function getAll() {
    const products = await productRepository.getAll();

    return products;
}

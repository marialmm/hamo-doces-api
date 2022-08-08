import * as productRepository from "../repositories/productRepository.js";

export async function getForFilter() {
    const products = await productRepository.getForFilter();

    return products;
}

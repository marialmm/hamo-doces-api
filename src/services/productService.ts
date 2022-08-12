import * as productRepository from "../repositories/productRepository.js";
import { conflictError, notFoundError } from "../utils/errorUtils.js";

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

    const formatedProducts = products.map((product) => {
        const price = (product.price / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        const picture = product.picture[0] ? product.picture[0].pictureUrl : "";

        return { ...product, price, picture };
    });

    return formatedProducts;
}

export async function getById(id: number) {
    const product: any = await checkProductExists(id);

    product.price = (product.price / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return product;
}

async function checkProductExists(id: number) {
    const product = await productRepository.getById(id);

    if (!product) {
        throw notFoundError("Product not found");
    }

    return product;
}

export async function deleteById(id: number) {
    await checkProductExists(id);

    await productRepository.deleteById(id);
}

import { Request, Response } from "express";
import { CreateProductData } from "../repositories/productRepository.js";

import * as productService from "../services/productService.js";
import { badRequesError } from "../utils/errorUtils.js";

export async function getForFilter(req: Request, res: Response) {
    const products = await productService.getForFilter();

    res.send(products);
}

export async function create(req: Request, res: Response) {
    const body: CreateProductData = req.body;

    await productService.create(body);

    res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const products = await productService.getAll();

    res.send(products);
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(+id)) {
        throw badRequesError("Invalid id");
    }

    const product = await productService.getById(+id);

    res.send(product);
}

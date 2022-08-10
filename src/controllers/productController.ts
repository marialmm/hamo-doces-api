import { request, Request, Response } from "express";
import { CreateProductData } from "../repositories/productRepository.js";

import * as productService from "../services/productService.js";

export async function getForFilter(req: Request, res: Response) {
    const products = await productService.getForFilter();

    res.send(products);
}

export async function create(req: Request, res: Response) {
    const body: CreateProductData = req.body;

    await productService.create(body);

    res.sendStatus(201);
}

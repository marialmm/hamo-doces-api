import { request, Request, Response } from "express";

import * as productService from "../services/productService.js"

export async function getForFilter(req: Request, res: Response){
    const products = await productService.getForFilter();

    res.send(products);
}
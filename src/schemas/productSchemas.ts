import Joi from "joi";
import { CreateProductData } from "../repositories/productRepository";

export const productSchema = Joi.object<CreateProductData>({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().integer().min(1).required(),
});

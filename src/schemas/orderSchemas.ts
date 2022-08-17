import Joi from "joi";
import { CreateOrderBody } from "../controllers/orderController";

export const orderSchema = Joi.object<CreateOrderBody>({
    clientName: Joi.string().required(),
    totalPrice: Joi.number().min(1).integer().required(),
    deliveryDate: Joi.date().min("now").required(),
    status: Joi.string()
        .valid("accepted", "making", "cancelled", "delivered")
        .required(),
    amountPaid: Joi.number().integer().required(),
    products: Joi.array()
        .items(
            Joi.object({
                quantity: Joi.number().min(1).integer().required(),
                flavor: Joi.string().optional(),
                id: Joi.number().required(),
            }).required()
        )
        .min(1)
        .required(),
    theme: Joi.string().required(),
});

export const updateOrderSchema = Joi.object<CreateOrderBody>({
    clientName: Joi.string().optional(),
    totalPrice: Joi.number().min(1).integer().optional(),
    deliveryDate: Joi.date().min("now").optional(),
    status: Joi.string()
        .valid("accepted", "making", "cancelled", "delivered")
        .optional(),
    amountPaid: Joi.number().integer().optional(),
    products: Joi.array()
        .items(
            Joi.object({
                quantity: Joi.number().min(1).integer().optional(),
                flavor: Joi.string().optional(),
                id: Joi.number().optional(),
            }).optional()
        )
        .min(1)
        .optional(),
    theme: Joi.string().optional(),
})
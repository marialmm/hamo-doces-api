import { Router } from "express";

import {
    validateToken,
    validateUserAdmin,
} from "../middlewares/authMiddleware.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { orderSchema, updateOrderSchema } from "../schemas/orderSchemas.js";
import * as orderController from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post(
    "/",
    validateJoi(orderSchema),
    validateToken,
    validateUserAdmin,
    orderController.create
);

orderRouter.get("/", validateToken, validateUserAdmin, orderController.getAll);

orderRouter.get(
    "/:id",
    validateToken,
    validateUserAdmin,
    orderController.getById
);

orderRouter.patch(
    "/:id",
    validateToken,
    validateUserAdmin,
    validateJoi(updateOrderSchema),
    orderController.update
);

export default orderRouter;

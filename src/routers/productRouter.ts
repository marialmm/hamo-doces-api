import { Router } from "express";

import * as productController from "../controllers/productController.js";
import {
    validateToken,
    validateUserAdmin,
} from "../middlewares/authMiddleware.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { productSchema } from "../schemas/productSchemas.js";

const productRouter = Router();

productRouter.get("/filter", productController.getForFilter);
productRouter.post(
    "",
    validateToken,
    validateUserAdmin,
    validateJoi(productSchema),
    productController.create
);

productRouter.get("/", validateToken, productController.getAll);

productRouter.get("/:id", validateToken, productController.getById);

productRouter.delete(
    "/:id",
    validateToken,
    validateUserAdmin,
    productController.deleteById
);

export default productRouter;

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

export default productRouter;

import {Router} from "express";

import * as productController from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/products/filter", productController.getForFilter);  

export default productRouter
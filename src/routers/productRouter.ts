import {Router} from "express";

import * as productController from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/filter", productController.getForFilter);  

export default productRouter
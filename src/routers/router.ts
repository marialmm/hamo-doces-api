import { Router } from "express";

import { handleError } from "../middlewares/handleErrorMiddleware.js";
import pictureRouter from "./pictureRouter.js";
import productRouter from "./productRouter.js";
import themeRouter from "./themeRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use("/pictures", pictureRouter);
router.use("/themes", themeRouter);
router.use("/products", productRouter);
router.use(handleError);

export default router;

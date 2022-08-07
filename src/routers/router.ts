import { Router } from "express";

import { handleError } from "../middlewares/handleErrorMiddleware.js";
import pictureRouter from "./pictureRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(pictureRouter);
router.use(handleError);

export default router;

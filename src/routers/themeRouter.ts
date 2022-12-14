import { Router } from "express";

import * as themeController from "../controllers/themeController.js";

const themeRouter = Router();

themeRouter.get("/", themeController.getAll);

export default themeRouter;

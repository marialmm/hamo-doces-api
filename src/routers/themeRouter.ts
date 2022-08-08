import { Router } from "express";

import * as themeController from "../controllers/themeController.js";

const themeRouter = Router();

themeRouter.get("/themes", themeController.getAll);

export default themeRouter;

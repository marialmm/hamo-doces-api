import { Router } from "express";

import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { pictureSchema } from "../schemas/pictureSchemas.js";
import * as pictureController from "../controllers/pictureController.js";
import {
    validateToken,
    validateUserAdmin,
} from "../middlewares/authMiddleware.js";

const pictureRouter = Router();

pictureRouter.post(
    "/",
    validateJoi(pictureSchema),
    validateToken,
    validateUserAdmin,
    pictureController.insert
);

pictureRouter.get("/", pictureController.getAll);

pictureRouter.get("/:id", pictureController.getById);
export default pictureRouter;

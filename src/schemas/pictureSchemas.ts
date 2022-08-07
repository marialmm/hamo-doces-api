import Joi from "joi";
import { InsertPictureBody } from "../controllers/pictureController";

export const pictureSchema = Joi.object<InsertPictureBody>({
    description: Joi.string(),
    isMain: Joi.boolean().required(),
    pictureUrl: Joi.string().required(),
    product: Joi.string().required(),
    themes: Joi.array().items(Joi.string()).required(),
});

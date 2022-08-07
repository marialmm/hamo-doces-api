import { Picture } from "@prisma/client";
import { Request, Response } from "express";

import * as pictureService from "../services/pictureService.js"

export type InsertPictureBody = Omit<Picture, "id"> & {
    product: string;
    themes: string[];
};

export async function insert(req: Request, res: Response) {
    const pictureData: InsertPictureBody = req.body;

    await pictureService.insert(pictureData);

    res.sendStatus(201);
}

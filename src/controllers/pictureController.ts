import { Picture } from "@prisma/client";
import { request, Request, response, Response } from "express";

import * as pictureService from "../services/pictureService.js";
import { badRequesError } from "../utils/errorUtils.js";

export type InsertPictureBody = Omit<Picture, "id"> & {
    product: string;
    themes: string[];
};

export async function insert(req: Request, res: Response) {
    const pictureData: InsertPictureBody = req.body;

    await pictureService.insert(pictureData);

    res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const { theme, product } = req.query;
    const pictures = await pictureService.getAll(+theme, +product);

    res.send(pictures);
}

export async function getById(req: Request, res: Response) {
    const { id } = req.params;

    if (isNaN(+id)) {
        throw badRequesError("Invalid id");
    }

    const picutre = await pictureService.getById(+id);

    res.send(picutre);
}

export async function deleteById(req: Request, res: Response){
    const {id} = req.params;

    if(isNaN(+id)){
        throw badRequesError("Invalid id");
    }

    await pictureService.deleteById(+id);

    res.sendStatus(200);
}
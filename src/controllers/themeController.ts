import { Request, Response } from "express";

import * as themeService from "../services/themeService.js"

export async function getAll(req: Request, res: Response){
    const themes = await themeService.getAll();

    res.send(themes);
}
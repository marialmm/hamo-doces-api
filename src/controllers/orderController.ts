import { Order } from "@prisma/client";
import { Request, Response } from "express";

import * as orderService from "../services/orderService.js";

export type CreateOrderBody = Omit<Order, "id" | "clientId" | "themeId"> & {
    products: {
        quantity: number;
        flavor?: string;
        id: number;
    },
    theme: string;
};

export async function create(req: Request, res: Response) {
    const body: CreateOrderBody = req.body;

    await orderService.create(body);

    res.sendStatus(201);
}

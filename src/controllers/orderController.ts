import { Order } from "@prisma/client";
import { Request, Response } from "express";

import * as orderService from "../services/orderService.js";
import { badRequesError } from "../utils/errorUtils.js";

export type CreateOrderBody = Omit<Order, "id" | "clientId" | "themeId"> & {
    products: {
        quantity: number;
        flavor?: string;
        id: number;
    };
    theme: string;
};

export async function create(req: Request, res: Response) {
    const body: CreateOrderBody = req.body;

    await orderService.create(body);

    res.sendStatus(201);
}

export async function getAll(req: Request, res: Response) {
    const orders = await orderService.getAll();

    res.send(orders);
}

export async function getById(req: Request, res: Response) {
    const {id} = req.params;

    if(isNaN(+id)){
        throw badRequesError("Invalid id");
    }

    const order = await orderService.getById(+id);

    res.send(order);
}
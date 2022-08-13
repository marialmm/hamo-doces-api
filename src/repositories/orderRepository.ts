import { Order, OrderProduct } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateOrderData = Omit<Order, "id">;

export async function create(orderData: CreateOrderData) {
    const order = await prisma.order.create({
        data: orderData,
    });

    return order;
}

export type CreateOrderProductsData = Omit<OrderProduct, "id">;

export async function createOrderProducts(
    orderProducts: CreateOrderProductsData[]
) {
    await prisma.orderProduct.createMany({
        data: orderProducts,
    });
}

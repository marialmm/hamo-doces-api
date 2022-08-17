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

export async function getAll() {
    const orders = await prisma.order.findMany({
        where: {
            NOT: { status: "cancelled" },
        },
        select: {
            id: true,
            deliveryDate: true,
            totalPrice: true,
            status: true,
            clientName: true,
            orderProducts: {
                select: {
                    products: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });

    return orders;
}

export async function getById(id: number) {
    const order = await prisma.order.findFirst({
        where: { id },
        select: {
            id: true,
            amountPaid: true,
            clientName: true,
            theme: true,
            deliveryDate: true,
            status: true,
            totalPrice: true,
            orderProducts: {
                select: {
                    products: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    flavor: true,
                    priceUnit: true,
                    quantity: true,
                },
            },
        },
    });

    return order;
}

export async function update(id: number, orderData: Partial<CreateOrderData>) {
    await prisma.order.update({
        where: { id },
        data: orderData,
    });
}

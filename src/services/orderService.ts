import { CreateOrderBody } from "../controllers/orderController.js";
import { notFoundError } from "../utils/errorUtils.js";
import * as themeRepository from "../repositories/themeRepository.js";
import * as orderRepository from "../repositories/orderRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import { formatCurrency, formatDate } from "../utils/formatDataUtils.js";

export async function create(orderData: CreateOrderBody) {
    const { theme, clientName, products } = orderData;

    const themeId = await getThemeId(theme);
    const clientId = await getClientId(clientName);

    const order = await orderRepository.create({
        amountPaid: orderData.amountPaid,
        clientName: orderData.clientName,
        deliveryDate: new Date(orderData.deliveryDate),
        status: orderData.status,
        themeId: themeId,
        totalPrice: orderData.totalPrice,
        clientId: clientId,
    });

    await createOrderProducts(products, order.id);
}

async function getThemeId(theme: string) {
    const { id } = await themeRepository.getOrCreate(theme);

    return id;
}

async function getClientId(clientName: string) {
    const client = await userRepository.getClientByName(clientName);

    if (client) {
        return client.id;
    } else {
        return null;
    }
}

async function createOrderProducts(products, orderId: number) {
    const orderProducts = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const productInfo = await productRepository.getById(product.id);

        if (!productInfo) {
            throw notFoundError("Product not found");
        }

        const orderProduct = {
            orderId,
            productId: product.id,
            quantity: product.quantity,
            flavor: product.flavor,
            priceUnit: productInfo.price,
        };

        orderProducts.push(orderProduct);
    }

    await orderRepository.createOrderProducts(orderProducts);
}

export async function getAll() {
    const orders = await orderRepository.getAll();

    const formatedOrders = orders.map((order) => {
        const totalPrice = formatCurrency(order.totalPrice);

        const products = order.orderProducts.map((orderProduct) => {
            return orderProduct.products;
        });

        const deliveryDate = formatDate(order.deliveryDate);

        return {
            id: order.id,
            clientName: order.clientName,
            totalPrice: totalPrice,
            deliveryDate: deliveryDate,
            status: order.status,
            products: products,
        };
    });
    return formatedOrders;
}

export async function getById(id: number) {
    const order = await checkOrderExists(id);

    if (!order) {
        throw notFoundError("Order not found");
    }

    const amountPaid = formatCurrency(order.amountPaid);
    const totalPrice = formatCurrency(order.totalPrice);
    const deliveryDate = formatDate(order.deliveryDate);

    const products = order.orderProducts.map((product) => {
        const priceUnit = formatCurrency(product.priceUnit);
        return {
            id: product.products.id,
            name: product.products.name,
            flavor: product.flavor,
            quantity: product.quantity,
            priceUnit,
        };
    });

    return {
        id: order.id,
        clientName: order.clientName,
        theme: order.theme,
        status: order.status,
        amountPaid,
        totalPrice,
        deliveryDate,
        products,
    };
}

async function checkOrderExists(id: number){
    const order = await orderRepository.getById(id);

    if (!order) {
        throw notFoundError("Order not found");
    }

    return order
}

export async function update(id: number, body: Partial<CreateOrderBody>) {
    const orderInfo: Partial<orderRepository.CreateOrderData> = {};

    if(body.theme){
        orderInfo.themeId = await getThemeId(body.theme);
        delete body.theme;
    }

    if(body.clientName){
        orderInfo.clientId = await getClientId(body.clientName);
    }

    await orderRepository.update(id, {...orderInfo, ...body})
}

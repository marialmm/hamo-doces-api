import { CreateOrderBody } from "../controllers/orderController.js";
import * as themeRepository from "../repositories/themeRepository.js";
import * as orderRepository from "../repositories/orderRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import { notFoundError } from "../utils/errorUtils.js";

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

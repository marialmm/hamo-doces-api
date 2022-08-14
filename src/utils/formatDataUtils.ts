import dayjs from "dayjs";

export function formatCurrency(value: number) {
    return (value / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function formatDate(date: Date) {
    return dayjs(date).format("DD/MM/YYYY");
}

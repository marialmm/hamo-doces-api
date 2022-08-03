type AppError = "wrong_schema";

export function errorTypeToStatusCode(type: AppError) {
    if (type === "wrong_schema") return 422;
}

export function wrongSchemaError(message?: string | string[]) {
    return {
        type: "wrong_schema",
        message: message || "",
    };
}

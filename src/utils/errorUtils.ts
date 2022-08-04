type AppError = "bad_request" | "unauthorized" | "wrong_schema";

export function errorTypeToStatusCode(type: AppError) {
    if (type === "bad_request") return 400;
    if (type === "unauthorized") return 401;
    if (type === "wrong_schema") return 422;
}

export function badRequesError(message?: string) {
    return {
        type: "bad_request",
        message: message || "",
    };
}

export function unauthorizedError(message?: string) {
    return {
        type: "unauthorized",
        message: message || "",
    };
}

export function wrongSchemaError(message?: string | string[]) {
    return {
        type: "wrong_schema",
        message: message || "",
    };
}

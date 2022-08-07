type AppError =
    | "bad_request"
    | "unauthorized"
    | "not_found"
    | "conflict"
    | "wrong_schema";

export function errorTypeToStatusCode(type: AppError) {
    if (type === "bad_request") return 400;
    if (type === "unauthorized") return 401;
    if (type === "not_found") return 404;
    if (type === "conflict") return 409;
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

export function notFoundError(message?: string) {
    return {
        type: "not_found",
        message: message || "",
    };
}

export function conflictError(message?: string) {
    return {
        type: "conflict",
        message: message || "",
    };
}

export function wrongSchemaError(message?: string | string[]) {
    return {
        type: "wrong_schema",
        message: message || "",
    };
}

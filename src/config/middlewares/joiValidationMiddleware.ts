import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { wrongSchemaError } from "../../utils/errorUtils";

export function validateJoi(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            const message = validation.error.details.map(
                (detail) => detail.message
            );
            throw wrongSchemaError(message);
        }

        next();
    };
}

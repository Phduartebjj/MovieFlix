import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/not-found.error.js';
import { BadRequestError } from '../errors/bad-request.js';

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (err instanceof NotFoundError) {
        return res.status(404).send({
            message: err.message,
        });
    }

    if (err instanceof BadRequestError) {
        return res.status(400).send({
            message: err.message,
        });
    }

    return res.status(500).send({
        message: err.message,
    });
}

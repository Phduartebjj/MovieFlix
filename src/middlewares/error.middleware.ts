import type { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    return res.status(500).send({
        message: err.message,
    });
}

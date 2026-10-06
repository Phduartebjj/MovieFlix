import type { Request, Response, NextFunction } from 'express';

export function movieMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { title, release_data, genre_id, language_id, oscar_count } =
        req.body;

    req.body = {
        title: title ?? null,
        release_data: release_data ? new Date(release_data) : null,
        genre_id: genre_id != null ? Number(genre_id) : null,
        language_id: language_id != null ? Number(language_id) : null,
        oscar_count: oscar_count != null ? Number(oscar_count) : null,
    };

    next();
}

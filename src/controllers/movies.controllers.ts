import type { NextFunction, Request, Response } from 'express';
import type { MoviesService } from '../services/movies.service.js';
export class MoviesController {
    private movieService: MoviesService;

    constructor(movieService: MoviesService) {
        this.movieService = movieService;
    }

    async getAllMovies(req: Request, res: Response, next: NextFunction) {
        try {
            const movies = await this.movieService.getAllMovies();
            return res.status(200).send(movies);
        } catch (error) {
            next(error);
        }
    }

    async getMovieById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res
                    .status(400)
                    .send({ message: 'ID do filme inválido' });
            }

            const movie = await this.movieService.getMovieById(id);

            return res.status(200).send(movie);
        } catch (error) {
            next(error);
        }
    }

    async getMoviesByGenre(req: Request, res: Response, next: NextFunction) {
        try {
            const genreName = req.params.genreName;

            if (!genreName || typeof genreName !== 'string') {
                return res
                    .status(400)
                    .send({ message: 'Nome do gênero inválido' });
            }
            const movies = await this.movieService.getMoviesByGenre(genreName);

            return res.status(200).send(movies);
        } catch (error) {
            next(error);
        }
    }

    async createMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const movieData = req.body;

            if (!movieData || typeof movieData !== 'object') {
                return res
                    .status(400)
                    .send({ message: 'Dados do filme inválidos' });
            }

            const movie = await this.movieService.createMovie(movieData);

            return res.status(201).send(movie);
        } catch (error) {
            next(error);
        }
    }

    async updateMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const movieData = req.body;

            if (isNaN(id)) {
                return res.status(400).send({
                    message: 'ID do filme inválido',
                });
            }

            if (!movieData || typeof movieData !== 'object') {
                return res
                    .status(400)
                    .send({ message: 'Dados do filme inválidos' });
            }

            const movie = await this.movieService.updateMovie(id, movieData);

            return res.status(200).send(movie);
        } catch (error) {
            next(error);
        }
    }

    async deleteMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).send({ message: 'Id não identificado' });
            }

            const deletedMovie = await this.movieService.deleteMovie(id);

            return res.status(200).send({
                message: `Filme deletado com sucesso ${deletedMovie?.title}`,
            });
        } catch (error) {
            next(error);
        }
    }
}

import type { Request, Response } from 'express';
import type { MoviesService } from '../services/movies.service.js';
export class MoviesController {
    private movieService: MoviesService;
    
    constructor(movieService: MoviesService) {
        this.movieService = movieService;
    }

    async getAllMovies(req: Request, res: Response) {
        const movies = await this.movieService.getAllMovies();

        if (!movies) {
            return res.status(404).send({ message: 'Nenhum filme encontrado' });
        }

        return res.status(200).send(movies);
    }

    async getMovieById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const movie = await this.movieService.getMovieById(id);

        if (!movie) {
            return res.status(404).send({ message: 'Filme não encontrado' });
        }

        return res.status(200).send(movie);
    }

    async getMoviesByGenre(req: Request, res: Response) {
        const genreName = req.params.genreName;

        if(!genreName || typeof genreName !== 'string') {
            return res.status(400).send({ message: 'Nome do gênero inválido' });
        }
        const movies = await this.movieService.getMoviesByGenre(genreName);

        if (!movies) {
            return res.status(404).send({ message: 'Nenhum filme encontrado para o gênero especificado' });
        }

        return res.status(200).send(movies);
    }
}

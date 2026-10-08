import { BadRequestError } from '../errors/bad-request.js';
import { NotFoundError } from '../errors/not-found.error.js';
import type { MovieInterface } from '../models/movies.type.js';
import { MoviesRepository } from '../repository/movies.repository.js';

export class MoviesService {
    private moviesRepository: MoviesRepository;

    constructor() {
        this.moviesRepository = new MoviesRepository();
    }

    async getAllMovies() {
        const movies = await this.moviesRepository.getAllMovies();

        if (movies.length === 0) {
            throw new NotFoundError('Nenhum filme encontrado');
        }

        return movies;
    }

    async getMovieById(id: number) {
        const movie = await this.moviesRepository.getMovieById(id);

        if (!movie) {
            throw new NotFoundError('Filme não encontrado');
        }

        return movie;
    }

    async getMoviesByGenre(genreName: string) {
        const movies = await this.moviesRepository.getMoviesByGenre(genreName);

        if (movies.length === 0) {
            throw new NotFoundError(
                'Nenhum filme encontrado para o gênero especificado'
            );
        }

        return movies;
    }

    async updateMovie(id: number, data: Partial<MovieInterface>) {
        if (data.title !== undefined && data.title.trim() === '') {
            throw new BadRequestError('Título do filme é obrigatório');
        }

        if (
            data.oscar_count !== undefined &&
            data.oscar_count !== null &&
            data.oscar_count < 0
        ) {
            throw new BadRequestError(
                'Quantidade de Oscars não pode ser negativa'
            );
        }

        if (
            data.release_data !== undefined &&
            data.release_data !== null &&
            isNaN(data.release_data.getTime())
        ) {
            throw new BadRequestError('Data de lançamento inválida');
        }

        return await this.moviesRepository.updateMovie(id, data);
    }

    async createMovie(data: MovieInterface) {
        if (!data.title || data.title.trim() === '') {
            throw new BadRequestError('Título do filme é obrigatório');
        }

        if (data.oscar_count !== null && data.oscar_count < 0) {
            throw new BadRequestError(
                'Quantidade de Oscars não pode ser negativa'
            );
        }

        if (data.release_data !== null && isNaN(data.release_data.getTime())) {
            throw new BadRequestError('Data de lançamento inválida');
        }

        return await this.moviesRepository.createMovie(data);
    }

    async deleteMovie(id: number) {
        if (id <= 0) {
            throw new BadRequestError('Id não reconhecido');
        }

        const deletedMovie = await this.moviesRepository.deleteMovie(id);

        return deletedMovie;
    }
}

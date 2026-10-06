import type { MovieInterface } from '../models/movies.type.js';
import { MoviesRepository } from '../repository/movies.repository.js';

export class MoviesService {
    private MoviesRepository: MoviesRepository;

    constructor() {
        this.MoviesRepository = new MoviesRepository();
    }

    async getAllMovies() {
        const movies = await this.MoviesRepository.getAllMovies();

        if (!movies || movies.length === 0) {
            throw new Error('Nenhum filme encontrado');
        }

        return movies;
    }

    async getMovieById(id: number) {
        const movie = await this.MoviesRepository.getMovieById(id);

        if (!movie) {
            throw new Error('Filme não encontrado');
        }

        return movie;
    }

    async getMoviesByGenre(genreName: string) {
        const movies = await this.MoviesRepository.getMoviesByGenre(genreName);

        if (!movies || movies.length === 0) {
            throw new Error(
                'Nenhum filme encontrado para o gênero especificado'
            );
        }

        return movies;
    }

    async updateMovie(id: number, data: MovieInterface) {
        const updatedMovie = await this.MoviesRepository.updateMovie(id, data);

        if (!updatedMovie) {
            throw new Error('Erro ao atualizar o filme');
        }

        return updatedMovie;
    }

    async createMovie(data: MovieInterface) {
        if (!data.title || data.title.trim() === '') {
            throw new Error('Título do filme é obrigatório');
        }

        if (data.oscar_count !== null && data.oscar_count < 0) {
            throw new Error('Quantidade de Oscars não pode ser negativa');
        }

        if (data.release_data !== null && isNaN(data.release_data.getTime())) {
            throw new Error('Data de lançamento inválida');
        }

        const movie = await this.MoviesRepository.createMovie(data);

        if (!movie) {
            throw new Error('Erro ao criar o filme');
        }

        return movie;
    }
}

import type { MovieInterface } from '../models/movies.type.js';
import { MoviesRepository } from '../repository/movies.repository.js';

export class MoviesService {
    private MoviesRepository: MoviesRepository;

    constructor() {
        this.MoviesRepository = new MoviesRepository();
    }

    async getAllMovies() {
        const movies = await this.MoviesRepository.getAllMovies();

        if(!movies || movies.length === 0) {
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

    async createMovie(data: MovieInterface) {
        const movie = await this.MoviesRepository.createMovie(data);

        if (!movie) {
            throw new Error('Erro ao criar o filme');
        }

        return movie;
    }
}

import { MoviesRepository } from '../repository/movies.repository.js';

export class MoviesService {
    private MoviesRepository: MoviesRepository;

    constructor() {
        this.MoviesRepository = new MoviesRepository();
    }

    async getAllMovies() {
        const movies = await this.MoviesRepository.getAllMovies();
        return movies;
    }

    async getMovieById(id: number) {
        const movie = await this.MoviesRepository.getMovieById(id);
        return movie;
    }

    async getMoviesByGenre(genreName: string) {
        const movies = await this.MoviesRepository.getMoviesByGenre(genreName);
        return movies;
    }
}

import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controllers.js';
import { MoviesService } from '../services/movies.service.js';
import { movieMiddleware } from '../middlewares/movie.middleware.js';

const router = Router();

const moviesService = new MoviesService();
const moviesController = new MoviesController(moviesService);

router.get('/', moviesController.getAllMovies.bind(moviesController));
router.get('/:id', moviesController.getMovieById.bind(moviesController));
router.get(
    '/genre/:genreName',
    moviesController.getMoviesByGenre.bind(moviesController)
);
router.post(
    '/',
    movieMiddleware,
    moviesController.createMovie.bind(moviesController)
);
router.put('/:id', movieMiddleware, moviesController.updateMovie.bind(moviesController));
// router.delete('/:id');

export default router;

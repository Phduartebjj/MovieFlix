import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controllers.js';

const router = Router();

router.get('/', MoviesController.prototype.getAllMovies.bind(MoviesController));
router.get(
    '/:id',
    MoviesController.prototype.getMovieById.bind(MoviesController)
);
router.get(
    '/genre/:genreName',
    MoviesController.prototype.getMoviesByGenre.bind(MoviesController)
);
// router.post('/');
// router.put('/:id');
// router.delete('/:id');

export default router;

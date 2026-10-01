import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controllers.js';

const router = Router();

router.get('/', MoviesController.prototype.getAllMovies.bind(MoviesController));
router.get(
    '/:id',
    MoviesController.prototype.getMovieById.bind(MoviesController)
);
// router.post('/');
// router.put('/:id');
// router.delete('/:id');
// router.get('/genre/:genreName');

export default router;

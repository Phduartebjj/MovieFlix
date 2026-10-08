import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import moviesRoutes from './routes/movies.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/movies', moviesRoutes);
app.use(errorMiddleware);
export default app;

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
const prisma = new PrismaClient();

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/movies', async (_, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: 'asc',
        },
        include: {
            genres: true,
            languages: true,
        },
    });
    res.json(movies);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

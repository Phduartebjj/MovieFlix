import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const port = 3000;

const app = express();

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json(movies);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

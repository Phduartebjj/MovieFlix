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

app.post('/movies', async (req, res) => {
    const { title, genre_id, language_id, oscar_count, release_data } =
        req.body;
    console.log(req.body);
    try {
        await prisma.movie.create({
            data: {
                title,
                genre_id: Number(genre_id),
                language_id: Number(language_id),
                oscar_count: Number(oscar_count),
                release_data: new Date(release_data),
            },
        });
    } catch (error) {
        return res.status(500).send({ message: 'Falha ao cadastrar filme' });
    }

    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

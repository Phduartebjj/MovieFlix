import { PrismaClient } from '@prisma/client';
import app from './app.js';
const prisma = new PrismaClient();

const port = 3000;

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
        //case insentive - se abusca for feita john ou John, o registro vai ser retornado na consulta.

        //case sensitive - se a busca for feita john ou John, o registro não vai ser retornado na consulta, ou seja vai dizer que o filme não é o mesmo.
        const movieWithSameTitle = await prisma.movie.findFirst({
            where: {
                title: { equals: title, mode: 'insensitive' },
            },
        });

        if (movieWithSameTitle) {
            return res.status(409).send({
                message: 'Já existe um filme cadastrado com esse título',
            });
        }

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

app.put('/movies/:id', async (req, res) => {
    //pegar o id do registro que vai ser atualizado
    try {
        console.log(req.body);
        const data = { ...req.body };
        const id = Number(req.params.id);

        const movie = await prisma.movie.findUnique({
            where: {
                id,
            },
        });

        if (!movie) {
            return res.status(404).send({ message: 'Filme não encontrado' });
        }

        data.release_data = data.release_data
            ? new Date(data.release_data)
            : undefined;
        //pegar os dados do filme que será atualizado e atualizar ele no prisma

        await prisma.movie.update({
            where: {
                id,
            },
            data: data,
        });

        //reotrnar o status correto informando que o filme foi atualizado.
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Falha ao atualizar filme' });
    }
    res.status(200).send({ message: 'Filme atualizado com sucesso' });
});

app.get('/movies/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const movie = await prisma.movie.findUnique({
            where: {
                id,
            },
        });
        if (!movie) {
            return res.status(404).send({ message: 'Filme não encontrado' });
        }
        res.json(movie);
    } catch (error) {
        return res.status(500).send({ message: 'Falha ao buscar filme' });
    }
});

app.delete('/movies/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const movie = await prisma.movie.findUnique({
            where: {
                id,
            },
        });

        if (!movie) {
            return res.status(404).send({ message: 'Filme não encontrado' });
        }
        await prisma.movie.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        return res.status(500).send({ message: 'Falha ao deletar filme' });
    }

    res.status(204).send({ message: 'Filme deletado com sucesso' });
});

app.get('/movies/genre/:genreName', async (req, res) => {
    try {
        const moviesFilteredByGenre = await prisma.movie.findMany({
            include: {
                genres: true,
                languages: true,
            },
            where: {
                genres: {
                    name: {
                        equals: req.params.genreName,
                        mode: 'insensitive',
                    },
                },
            },
        });

        res.status(200).send(moviesFilteredByGenre);
    } catch (error) {
        res.status(500).send({ message: 'Falha ao buscar filmes por gênero' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

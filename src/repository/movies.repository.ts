import { PrismaClient } from '@prisma/client';
import type { MovieInterface } from '../models/movies.type.js';

const prisma = new PrismaClient();
export class MoviesRepository {
    async getAllMovies() {
        return await prisma.movie.findMany({
            orderBy: {
                title: 'asc',
            },
            include: {
                genres: true,
                languages: true,
            },
        });
    }

    async getMovieById(id: number) {
        return await prisma.movie.findUnique({
            where: {
                id,
            },
        });
    }

    async getMoviesByGenre(genreName: string) {
        return await prisma.movie.findMany({
            include: {
                genres: true,
                languages: true,
            },
            where: {
                genres: {
                    name: genreName,
                    mode: 'insensitive',
                },
            },
        });
    }

    async createMovie(data: MovieInterface) {
        return await prisma.movie.create({
            data,
        });
    }
}

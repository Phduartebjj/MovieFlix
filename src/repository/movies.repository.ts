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
                },
            },
        });
    }

    async createMovie(data: MovieInterface) {
        return await prisma.movie.create({
            data: {
                title: data.title,
                release_data: data.release_data,
                genre_id: data.genre_id,
                language_id: data.language_id,
                oscar_count: data.oscar_count,
            },
        });
    }
    async updateMovie(id: number, data: Partial<MovieInterface>) {
        return await prisma.movie.update({
            where: {
                id,
            },
            data: {
                ...(data.title !== undefined && { title: data.title }),
                ...(data.release_data !== undefined && {
                    release_data: data.release_data,
                }),
                ...(data.genre_id !== undefined && { genre_id: data.genre_id }),
                ...(data.language_id !== undefined && {
                    language_id: data.language_id,
                }),
                ...(data.oscar_count !== undefined && {
                    oscar_count: data.oscar_count,
                }),
            },
        });
    }
    async deleteMovie(id: number) {
        return await prisma.movie.delete({
            where: {
                id,
            },
        });
    }
}

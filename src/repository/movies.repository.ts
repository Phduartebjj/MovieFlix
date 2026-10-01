import { PrismaClient } from '@prisma/client';

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
            }
        });
    }
}

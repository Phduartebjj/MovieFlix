export interface MovieInterface {
    id: number;
    title: string | null;
    release_data: Date | null;
    genre_id: number | null;
    language_id: number | null;
    oscar_count: number | null;
}

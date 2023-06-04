declare interface ITrending {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: "movie";
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

declare interface ITrendingResponse {
    page: number;
    results: ITrending;
    total_pages: number;
    total_results: number
}
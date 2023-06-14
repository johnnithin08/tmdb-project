declare interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
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

declare type TMovieCategory = "Now Playing" | "Popular" | "Top Rating" | "Upcoming"
declare type TTvSeriesCategory = "Airing Today" | "On the Air" | "Popular" | "Top Rated"
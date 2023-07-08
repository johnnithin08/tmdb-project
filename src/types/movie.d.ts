declare interface IMovieParent {
    adult: boolean;
    backdrop_path: string;
    id: number;
    original_language: string;
    original_title?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
}


declare interface IMovie extends IMovieParent {
    genre_ids: number[];
};

interface IGenres {
    id: number;
    name: string;
}

interface IProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface IProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface ISpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface ICreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}

interface ILastEpisode {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

interface INetworks {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ISeasons {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}


interface IMovieDetails extends IMovieParent {
    belongs_to_collection?: null | object;
    budget?: number;
    created_by?: ICreatedBy[];
    episode_run_time?: number[];
    first_air_date?: string;
    genres: IGenres[];
    homepage: string;
    imdb_id?: string;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: ILastEpisode;
    name?: string;
    networks?: INetworks[];
    next_episode_to_air?: null;
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_name?: string;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountries[];
    revenue?: number;
    runtime?: number;
    seasons?: ISeasons[];
    spoken_languages?: ISpokenLanguages[];
    status: string;
    tagline: string;
    type?: string;
}


declare type TMovieCategory = "Now Playing" | "Popular" | "Top Rating" | "Upcoming"
declare type TTvSeriesCategory = "Airing Today" | "On the Air" | "Popular" | "Top Rated"
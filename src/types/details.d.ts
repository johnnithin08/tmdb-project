interface IMovieVideos {
  id: number;
  results: IVideoResult[];
}

interface IVideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface IAccountStates {
  id: number;
  favorite: boolean;
  rated: {
    value: number;
  };
  watchlist: boolean;
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IMoviesState {
  currentMovie?: IMovie;
  movieCategory: TMovieCategory;
  movieList: IMovie[];
  searchTerm: string;
  trending: ITrending[];
}

// Define the initial state using that type
const initialState: IMoviesState = {
  currentMovie: undefined,
  movieCategory: "Now Playing",
  movieList: [],
  searchTerm: "",
  trending: []
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateMoviesList: (state, action: PayloadAction<IMovie[]>) => {
      state.movieList = action.payload
    },
    updateCurrentMovie: (state, action: PayloadAction<IMovie>) => {
      state.currentMovie = action.payload
    },
    updateSearchMovie: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    updateMovieCategory: (state, action: PayloadAction<TMovieCategory>) => {
      state.movieCategory = action.payload
    },
    updateTrendingMovies: (state, action: PayloadAction<ITrending[]>) => {
      state.trending = action.payload
    },
  },
})

export const { updateCurrentMovie, updateMoviesList, updateSearchMovie, updateMovieCategory, updateTrendingMovies } = movieSlice.actions
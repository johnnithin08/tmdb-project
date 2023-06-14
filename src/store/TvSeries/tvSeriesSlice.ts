import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ITvSeriesState {
    searchTerm: string;
    seriesCategory: TTvSeriesCategory;
    trending: ITrending[];
    tvSeriesList: IMovie[];
}

const initialState: ITvSeriesState = {
    searchTerm: "",
    seriesCategory: "Airing Today",
    trending: [],
    tvSeriesList: [],
}


export const tvSeriesSlice = createSlice({
    name: "tvSeries",
    initialState,
    reducers: {
        updateTvSeriesList: (state, action: PayloadAction<IMovie[]>) => {
            state.tvSeriesList = action.payload
        },
        updateSearchTvSeries: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        updateSeriesCategory: (state, action: PayloadAction<TTvSeriesCategory>) => {
            state.seriesCategory = action.payload;
        },
        updateTrendingSeries: (state, action: PayloadAction<ITrending[]>) => {
            state.trending = action.payload;
        }
    }
})

export const { updateTvSeriesList, updateSearchTvSeries, updateSeriesCategory, updateTrendingSeries } = tvSeriesSlice.actions
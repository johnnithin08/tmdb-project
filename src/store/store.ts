import { configureStore } from '@reduxjs/toolkit'

import { movieSlice } from "./Movies"
import { globalSlice } from "./Global"
import { tvSeriesSlice } from "./TvSeries"
// ...

export const store = configureStore({
    reducer: {
        globalState: globalSlice.reducer,
        moviesState: movieSlice.reducer,
        tvSeriesState: tvSeriesSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
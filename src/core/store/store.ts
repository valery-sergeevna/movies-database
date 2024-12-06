import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../slices/movies.slice";
import movieDetailsSlice from "../slices/movie-details.slice";

export const rootReducer = {
    movies: moviesSlice,
    movieDetails: movieDetailsSlice,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

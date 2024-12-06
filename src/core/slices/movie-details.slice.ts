import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMoviesFromApi } from "../helpers";
import { MovieDetailsState, StatusRequest } from "../types";

const initialState: MovieDetailsState = {
    data: null,
    status: StatusRequest.IDLE,
    error: null,
};

export const fetchMovieById = createAsyncThunk(
    "movieDetails/fetchMovieById",
    async (movieId: number, { rejectWithValue }) => {
        try {
            const endpoint = `movie/${movieId}`;
            const data = await fetchMoviesFromApi(endpoint, {});

            if (!data) {
                throw new Error("No data received from API");
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(
                error.message ||
                    "Failed to fetch movie details. Please try again.",
            );
        }
    },
);

const movieDetailsSlice = createSlice({
    name: "movieDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieById.pending, (state) => {
                state.status = StatusRequest.PENDING;
                state.error = null;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = StatusRequest.FULFILLED;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = StatusRequest.REJECTED;
            });
    },
});

export default movieDetailsSlice.reducer;

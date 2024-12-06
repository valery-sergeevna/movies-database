import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMoviesFromApi } from "../helpers";
import { MovieState, StatusRequest } from "../types";

const initialState: MovieState = {
    data: [],
    totalPages: 0,
    totalResults: 0,
    currentPage: 1,
    status: StatusRequest.IDLE,
    error: null,
    query: "",
};
export const fetchMoviesData = createAsyncThunk(
    "movies/fetchMoviesData",
    async (
        { page, query }: { page: number; query: string },
        { rejectWithValue },
    ) => {
        try {
            const endpoint = query.trim() ? "search/movie" : "movie/popular";

            const params = query.trim() ? { query, page } : { page };

            const data = await fetchMoviesFromApi(endpoint, params);

            if (!data) {
                throw new Error("No data received from API");
            }

            const { results = [], total_pages = 0, total_results = 0 } = data;

            return {
                movies: results,
                totalPages: total_pages,
                totalResults: total_results,
            };
        } catch (error: any) {
            return rejectWithValue(
                error.message || "Failed to fetch movies. Please try again.",
            );
        }
    },
);
const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearchQuery(state, action) {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesData.pending, (state) => {
                state.status = StatusRequest.PENDING;
                state.error = null;
            })
            .addCase(fetchMoviesData.fulfilled, (state, action) => {
                state.data = action.payload.movies;
                state.totalPages = action.payload.totalPages;
                state.totalResults = action.payload.totalResults;
                state.status = StatusRequest.FULFILLED;
            })
            .addCase(fetchMoviesData.rejected, (state, action) => {
                state.error = action.payload as string;
                state.status = StatusRequest.REJECTED;
            });
    },
});

export const { setCurrentPage, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;

import reducer, {
    setCurrentPage,
    setSearchQuery,
    fetchMoviesData,
} from "../movies.slice";
import { StatusRequest } from "../../types";

describe("test moviesSlice reducer", () => {
    const initialState = {
        data: [],
        totalPages: 0,
        totalResults: 0,
        currentPage: 1,
        status: StatusRequest.IDLE,
        error: null,
        query: "",
    };

    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should handle setCurrentPage", () => {
        const nextState = reducer(initialState, setCurrentPage(2));
        expect(nextState.currentPage).toBe(2);
    });

    it("should handle setSearchQuery", () => {
        const nextState = reducer(initialState, setSearchQuery("action"));
        expect(nextState.query).toBe("action");
        expect(nextState.currentPage).toBe(1);
    });

    it("should handle fetchMoviesData.pending", () => {
        const action = { type: fetchMoviesData.pending.type };
        const nextState = reducer(initialState, action);
        expect(nextState.status).toBe(StatusRequest.PENDING);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchMoviesData.fulfilled", () => {
        const action = {
            type: fetchMoviesData.fulfilled.type,
            payload: {
                movies: [{ id: 1, title: "Movie 1" }],
                totalPages: 5,
                totalResults: 50,
            },
        };
        const nextState = reducer(initialState, action);
        expect(nextState.data).toEqual([{ id: 1, title: "Movie 1" }]);
        expect(nextState.totalPages).toBe(5);
        expect(nextState.totalResults).toBe(50);
        expect(nextState.status).toBe(StatusRequest.FULFILLED);
    });

    it("should handle fetchMoviesData.rejected", () => {
        const action = {
            type: fetchMoviesData.rejected.type,
            payload: "Failed to fetch movies",
        };
        const nextState = reducer(initialState, action);
        expect(nextState.error).toBe("Failed to fetch movies");
        expect(nextState.status).toBe(StatusRequest.REJECTED);
    });
});

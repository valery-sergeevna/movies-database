import reducer, { fetchMovieById } from "../movie-details.slice";
import { StatusRequest } from "../../types";

describe("test movieDetailsSlice reducer", () => {
    const initialState = {
        data: null,
        status: StatusRequest.IDLE,
        error: null,
    };

    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle fetchMovieById.pending", () => {
        const action = { type: fetchMovieById.pending.type };
        const nextState = reducer(initialState, action);
        expect(nextState.status).toBe(StatusRequest.PENDING);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchMovieById.fulfilled", () => {
        const action = {
            type: fetchMovieById.fulfilled.type,
            payload: { id: 1, title: "Venom", year: 2010 },
        };
        const nextState = reducer(initialState, action);
        expect(nextState.data).toEqual(action.payload);
        expect(nextState.status).toBe(StatusRequest.FULFILLED);
    });

    it("should handle fetchMovieById.rejected", () => {
        const action = {
            type: fetchMovieById.rejected.type,
            payload: "Failed to fetch movie details. Please try again.",
        };
        const nextState = reducer(initialState, action);
        expect(nextState.error).toBe(action.payload);
        expect(nextState.status).toBe(StatusRequest.REJECTED);
    });
});

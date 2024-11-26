import reducer, { setCurrentPage, fetchBirthsData } from "../birthday-slice";

describe("test birthdaySlice reducer", () => {
    const initialState = {
        data: [],
        totalPages: 0,
        currentPage: 1,
        loading: false,
        error: null,
    };

    it("should handle initial state", () => {
        // Dispatching with undefined for both state and action
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should handle setCurrentPage", () => {
        const nextState = reducer(initialState, setCurrentPage(2));
        expect(nextState.currentPage).toBe(2);
    });

    it("should handle fetchBirthsData.pending", () => {
        const action = { type: fetchBirthsData.pending.type };
        const nextState = reducer(initialState, action);
        expect(nextState.loading).toBe(true);
    });
    it("should handle fetchBirthsData.fulfilled", () => {
        const action = {
            type: fetchBirthsData.fulfilled.type,
            payload: { sortedBirths: [], totalPages: 1 },
        };
        const nextState = reducer(initialState, action);
        expect(nextState.data).toEqual([]);
        expect(nextState.totalPages).toBe(1);
        expect(nextState.loading).toBe(false);
    });

    it("should handle fetchBirthsData.rejected", () => {
        const action = {
            type: fetchBirthsData.rejected.type,
            payload: "Failed to fetch data",
        };
        const nextState = reducer(initialState, action);
        expect(nextState.error).toBe("Failed to fetch data");
        expect(nextState.loading).toBe(false);
    });
});

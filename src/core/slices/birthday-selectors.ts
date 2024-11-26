import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BIRTHDAY_FEATURE_KEY } from "../constants";

export const getBirthdayState = (state: RootState) =>
    state[BIRTHDAY_FEATURE_KEY];

export const selectBirthdays = createSelector(
    getBirthdayState,
    (state) => state.data,
);

export const selectCurrentPage = createSelector(
    getBirthdayState,
    (state) => state.currentPage,
);

export const selectLoading = createSelector(
    getBirthdayState,
    (state) => state.loading,
);
export const selectError = createSelector(
    getBirthdayState,
    (state) => state.error,
);

export const selectTotalPages = createSelector(
    getBirthdayState,
    (state) => state.totalPages,
);

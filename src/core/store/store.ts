import { configureStore } from "@reduxjs/toolkit";
import birthdaySlice from "../slices/birthday-slice";

export const rootReducer = {
    birthdays: birthdaySlice,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

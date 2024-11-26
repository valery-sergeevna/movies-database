import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    BIRTHDAY_FEATURE_KEY,
    BIRTHDAYS_API_URL,
    BIRTHDAYS_PER_PAGE,
} from "../constants";
import { BirthdayItemType, BirthdayState } from "../types";
import axios from "axios";
import { getCurrentDate } from "../helpers";

const initialState: BirthdayState = {
    data: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
};
export const fetchBirthsData = createAsyncThunk(
    "birthdays/fetchBirthsData",
    async (_, { rejectWithValue }) => {
        try {
            const { month, day } = getCurrentDate();
            const url = `${BIRTHDAYS_API_URL}/${month}/${day}`;

            const response = await axios.get(url);
            const sortedBirths = response.data.births.sort(
                (a: BirthdayItemType, b: BirthdayItemType) => a.year - b.year,
            );

            return {
                sortedBirths,
                totalPages: Math.ceil(sortedBirths.length / BIRTHDAYS_PER_PAGE),
            };
        } catch (error: any) {
            return rejectWithValue("Failed to fetch data. Please try again.");
        }
    },
);

const birthdaySlice = createSlice({
    name: BIRTHDAY_FEATURE_KEY,
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBirthsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBirthsData.fulfilled, (state, action) => {
                state.data = action.payload.sortedBirths;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchBirthsData.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export const { setCurrentPage } = birthdaySlice.actions;
export default birthdaySlice.reducer;

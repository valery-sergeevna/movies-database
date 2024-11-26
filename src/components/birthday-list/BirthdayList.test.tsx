import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BirthdayList } from "./BirthdayList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import birthdaySlice from "../../core/slices/birthday-slice";
import axios from "axios";
import { BirthdayItemType } from "../../core/types";

jest.mock("axios", () => ({
    get: jest.fn(),
}));

const mockBirthdays = [
    {
        text: "Emperor Taizong of Jin",
        year: 1075,
        pages: [
            {
                title: "Emperor_Taizong_of_Jin",
                timestamp: "2024-11-23T00:55:12Z",
            },
            {
                title: "Emperor_Taizong_of_Jin 2",
                timestamp: "2024-11-23T00:55:12Z",
            },
        ],
    },
];

const renderBirthdayList = (store: any) => {
    return render(
        <Provider store={store}>
            <BirthdayList />
        </Provider>,
    );
};

// set the mock behavior for axios after declaring mockBirthdays
(axios.get as jest.Mock).mockResolvedValue({
    data: {
        births: mockBirthdays,
    },
});

const createMockStore = (
    error: string | null,
    data: BirthdayItemType[] = [],
) => {
    return configureStore({
        reducer: {
            birthdays: birthdaySlice,
        },
        preloadedState: {
            birthdays: {
                data: data,
                totalPages: 1,
                currentPage: 1,
                loading: false,
                error: error,
            },
        },
    });
};

test("should render Pagination component and birthday Item after loading data", async () => {
    const mockStore = createMockStore(null, mockBirthdays);
    renderBirthdayList(mockStore);
    const loadButton = screen.getByRole("button", { name: /load birthdays/i });
    fireEvent.click(loadButton);

    const pagination = await waitFor(() => screen.getByRole("navigation"));
    expect(pagination).toBeInTheDocument();
    const birthdayItem = screen.getByText(/Emperor Taizong of Jin/i);
    expect(birthdayItem).toBeInTheDocument();
});

test("should show error modal when error occurs", async () => {
    const mockStore = createMockStore("Failed to load data");
    renderBirthdayList(mockStore);
    const errorModal = await waitFor(() => screen.getByRole("dialog"));
    expect(errorModal).toBeInTheDocument();
});

test("should cancel modal when click on 'cancel' button in dialog", async () => {
    const mockStore = createMockStore("Failed to load data");

    renderBirthdayList(mockStore);

    const errorModal = await waitFor(() => screen.getByRole("dialog"));
    expect(errorModal).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    // Check that the modal is no longer displayed
    await waitFor(() => {
        expect(screen.queryByRole("dialog")).toBeNull();
    });
});

test("should display loading spinner while fetching data", async () => {
    const mockStore = createMockStore(null);

    mockStore.dispatch({
        type: "birthdays/setLoading",
        payload: true,
    });

    renderBirthdayList(mockStore);

    const loadButton = screen.getByRole("button", { name: /load birthdays/i });
    fireEvent.click(loadButton);

    // Check that CircularProgress (loader) is displayed instead of text
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    // check that the button text disappears
    const buttonText = screen.queryByText("Load Birthdays");
    expect(buttonText).toBeNull();
});

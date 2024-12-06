import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../core/store";
import { MoviesList } from "./MoviesList";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedMovies = [
    {
        id: 1,
        title: "Movie 1",
        poster_path: "poster1.jpg",
        vote_average: 7.8,
        release_date: "2023-06-01",
        vote_count: 1200,
        backdrop_path: "backdrop1.jpg",
        overview: "A thrilling adventure movie about space exploration.",
        original_language: "en",
    },
    {
        id: 2,
        title: "Movie 2",
        poster_path: "poster2.jpg",
        vote_average: 6.5,
        release_date: "2022-11-15",
        vote_count: 800,
        backdrop_path: "backdrop2.jpg",
        overview: "A drama about family relationships and conflicts.",
        original_language: "en",
    },
];

const renderWithProviders = () =>
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MoviesList />
            </MemoryRouter>
        </Provider>,
    );

describe("MoviesList Component", () => {
    beforeEach(() => {
        mockedAxios.get.mockClear();
    });

    test("fetches movies data and displays them correctly", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                results: mockedMovies,
                total_pages: 1,
                total_results: 2,
            },
        });

        renderWithProviders();

        expect(screen.getByRole("progressbar")).toBeInTheDocument();

        await waitFor(() =>
            expect(screen.getByText("Movie 1")).toBeInTheDocument(),
        );
        await waitFor(() =>
            expect(screen.getByText("Movie 2")).toBeInTheDocument(),
        );
    });

    test("displays 'No movies found' when there are no movies", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                results: [],
                total_pages: 0,
                total_results: 0,
            },
        });

        renderWithProviders();

        await waitFor(() =>
            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
        );

        expect(screen.getByText("No movies found")).toBeInTheDocument();
    });

    test("displays an error message when the request fails", async () => {
        mockedAxios.get.mockRejectedValueOnce(
            new Error("Failed to fetch movies"),
        );

        renderWithProviders();

        await waitFor(() =>
            expect(screen.getByText(/failed/i)).toBeInTheDocument(),
        );
    });
});

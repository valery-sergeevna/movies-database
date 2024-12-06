import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../core/store";
import { MemoryRouter } from "react-router-dom";
import { MovieSearch } from "./MoviesSearch";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithProviders = () => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <MovieSearch />
            </MemoryRouter>
        </Provider>,
    );
};

describe("MovieSearch component", () => {
    test("renders and allows user to type a query", () => {
        renderWithProviders();

        const input = screen.getByLabelText(/search movies/i);
        fireEvent.change(input, { target: { value: "Test Movie" } });

        expect(input).toHaveValue("Test Movie");
    });

    test("shows number of movies found when query is entered", async () => {
        store.getState = jest.fn().mockReturnValue({
            movies: {
                query: "Test Movie",
                totalResults: 5,
            },
        });

        renderWithProviders();

        fireEvent.change(screen.getByLabelText(/search movies/i), {
            target: { value: "Test Movie" },
        });

        await waitFor(() => {
            expect(screen.getByText("5 movies found.")).toBeInTheDocument();
        });
    });

    test("sends correct query parameter when search query is entered", async () => {
        const mockedResponse = {
            data: {
                results: [
                    {
                        id: 1,
                        title: "Test Movie 1",
                        poster_path: "poster1.jpg",
                    },
                ],
                total_pages: 1,
                total_results: 1,
            },
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        renderWithProviders();

        const input = screen.getByLabelText(/search movies/i);
        fireEvent.change(input, { target: { value: "Test Movie" } });

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    params: expect.objectContaining({
                        query: "Test Movie",
                    }),
                }),
            );
        });
    });

    test("displays number of movies found when query is entered and there are results", async () => {
        store.getState = jest.fn().mockReturnValue({
            movies: {
                query: "Test Movie",
                totalResults: 5,
            },
        });

        renderWithProviders();
        const input = screen.getByLabelText(/search movies/i);
        fireEvent.change(input, { target: { value: "Test Movie" } });

        await waitFor(() => {
            expect(screen.getByText("5 movies found.")).toBeInTheDocument();
        });
    });
});

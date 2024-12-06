import { fireEvent, render, screen } from "@testing-library/react";
import { MovieItem } from "./MovieItem";
import { BrowserRouter as Router } from "react-router-dom";
import { MovieItemType } from "../../core/types";

const mockMovie = {
    id: 1,
    title: "Test Movie",
    poster_path: "poster123.jpg",
    release_date: "2023-01-01",
    vote_average: 8.5,
    vote_count: 200,
};

const mockMovieWithoutImage = {
    id: 2,
    title: "Test Movie",
    poster_path: "",
    release_date: "2023-01-01",
    vote_average: 7.0,
    vote_count: 150,
};

const renderMovieItem = (movie: MovieItemType) =>
    render(
        <Router>
            <MovieItem movie={movie} />
        </Router>,
    );

describe("MovieItem", () => {
    test("displays the movie title", () => {
        renderMovieItem(mockMovie);
        expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });

    test("displays the movie poster with the correct src and alt attributes", () => {
        renderMovieItem(mockMovie);
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500/poster123.jpg",
        );
        expect(image).toHaveAttribute("alt", "Test Movie");
    });

    test("displays the default poster if no image is available", () => {
        renderMovieItem(mockMovieWithoutImage);
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("test-no-poster"),
        );
        expect(image).toHaveAttribute("alt", "Test Movie");
    });

    test("should navigate to the correct movie page on click", () => {
        renderMovieItem(mockMovie);
        const movieLink = screen.getByRole("link");

        expect(movieLink).toHaveAttribute("href", "/1");
        fireEvent.click(movieLink);
        expect(window.location.pathname).toBe("/1");
    });
});

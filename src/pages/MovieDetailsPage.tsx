import { memo } from "react";
import { MovieDetails } from "../components";

const MovieDetailsPage = () => {
    return <MovieDetails />;
};
const _MovieDetailsPage = memo(MovieDetailsPage);

export { _MovieDetailsPage as MovieDetailsPage };

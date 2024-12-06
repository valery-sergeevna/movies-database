import { memo } from "react";
import { MovieSearch, MoviesList } from "../components";
import { Typography } from "@mui/material";

const MoviesPage = () => {
    return (
        <>
            <Typography variant='h4' align='center'>
                Movies List
            </Typography>
            <MovieSearch />
            <MoviesList />
        </>
    );
};

const _MoviesPage = memo(MoviesPage);

export { _MoviesPage as MoviesPage };

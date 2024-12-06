import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store";
import { useParams } from "react-router-dom";
import { Box, CardMedia, Typography, CircularProgress } from "@mui/material";
import "./movie-details.scss";
import { MOVIES_IMG_LINK } from "../../core/constants";
import { fetchMovieById } from "../../core/slices";
import { StatusRequest } from "../../core/types";

const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const allMovies = useSelector((state: RootState) => state.movies.data);
    const {
        data: movie,
        status,
        error,
    } = useSelector((state: RootState) => state.movieDetails);
    const foundMovie = useMemo(() => {
        return allMovies.find((movie) => movie.id === Number(movieId));
    }, [allMovies, movieId]);

    useEffect(() => {
        if (!foundMovie && movieId && !movie) {
            dispatch(fetchMovieById(Number(movieId)));
        }
    }, [foundMovie, movieId, dispatch, movie]);

    const movieToDisplay = foundMovie || movie;

    if (!movieToDisplay) {
        return null;
    }
    const {
        title,
        overview,
        vote_average,
        vote_count,
        release_date,
        original_language,
        backdrop_path,
    } = movieToDisplay;

    return (
        <>
            {status === StatusRequest.PENDING && (
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <CircularProgress size='3rem' />
                </Box>
            )}
            {status === StatusRequest.REJECTED && error && (
                <Typography align='center' color='error'>
                    {error}
                </Typography>
            )}
            {(movieToDisplay || status === StatusRequest.FULFILLED) && (
                <Box className='movie-details'>
                    <Typography
                        variant='h6'
                        className='movie-details__title'
                    >
                        <strong>Title:</strong> {title}
                    </Typography>
                    <div className='movie-details__wrapper flex-center'>
                        <CardMedia
                            component='img'
                            image={`${MOVIES_IMG_LINK}/${backdrop_path}`}
                            alt={title}
                            className='movie-details__poster'
                        />
                    </div>
                    <Typography className='movie-details__overview'>
                        {overview}
                    </Typography>
                    <Typography className='movie-details__rating'>
                        <strong>Rating:</strong> {vote_average} ({vote_count}{" "}
                        votes)
                    </Typography>
                    <Typography className='movie-details__date'>
                        <strong>Release Date:</strong> {release_date}
                    </Typography>
                    <Typography className='movie-details__language'>
                        <strong>Original Language:</strong> {original_language}
                    </Typography>
                </Box>
            )}
        </>
    );
};

const MemoizedMovieDetails = memo(MovieDetails);

export { MemoizedMovieDetails as MovieDetails };

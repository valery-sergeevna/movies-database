import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store";
import { fetchMoviesData, setCurrentPage } from "../../core/slices";
import { Typography, Box, Pagination, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MovieItem } from "../movie-item";
import "./movies-list.scss";
import { StatusRequest } from "../../core/types";

const MoviesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, totalPages, currentPage, status, error, query } = useSelector(
        (state: RootState) => state.movies,
    );

    const handlePageChange = useCallback(
        (_event: ChangeEvent<unknown>, page: number) => {
            if (page !== currentPage) {
                dispatch(setCurrentPage(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        [currentPage, dispatch],
    );

    useEffect(() => {
        if (query.trim() === "") {
            dispatch(fetchMoviesData({ page: currentPage, query }));
        }
    }, [query, currentPage, dispatch]);

    return (
        <div>
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
            {status === StatusRequest.FULFILLED && (
                <div className='movies-list' data-testid='movies-list'>
                    {data.length > 0 ? (
                        <Grid
                            container
                            justifyContent='center'
                            spacing={4}
                            columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 5 }}
                        >
                            {data.map((movie) => (
                                <MovieItem key={movie.id} movie={movie} />
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant='h6' align='center'>
                            No movies found
                        </Typography>
                    )}
                    {totalPages > 1 && (
                        <Box className='movies-list__pagination flex-center'>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color='primary'
                            />
                        </Box>
                    )}
                </div>
            )}
        </div>
    );
};

const _MoviesList = memo(MoviesList);

export { _MoviesList as MoviesList };

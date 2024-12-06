import { memo, useEffect, useRef } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesData, setSearchQuery } from "../../core/slices";
import { AppDispatch, RootState } from "../../core/store";
import { debounce } from "lodash";
import "./movie-search.scss";

const MovieSearch = () => {
    const { query, totalResults } = useSelector(
        (state: RootState) => state.movies,
    );
    const dispatch = useDispatch<AppDispatch>();

    const debounceRef = useRef(
        debounce((query: string) => {
            dispatch(fetchMoviesData({ page: 1, query }));
        }, 500),
    );

    useEffect(() => {
        if (query.trim() === "") {
            return;
        }
        debounceRef.current(query);
        return () => {
            debounceRef.current.cancel();
        };
    }, [query, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <div className='movie-search'>
            <Box
                display='flex'
                justifyContent='center'
                className='movie-search__wrapper'
            >
                <TextField
                    label='Search Movies'
                    variant='outlined'
                    value={query}
                    onChange={handleSearchChange}
                    fullWidth
                    className='movie-search__input'
                />
            </Box>
            {query && !!totalResults && (
                <Typography
                    variant='body1'
                    className='movie-search__results'
                    mb={3}
                >
                    {totalResults} {totalResults === 1 ? "movie" : "movies"}{" "}
                    found.
                </Typography>
            )}
        </div>
    );
};

const _MovieSearch = memo(MovieSearch);

export { _MovieSearch as MovieSearch };

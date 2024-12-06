import { FC, memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MovieItemProps } from "../../core/types";
import { Link } from "react-router-dom";
import "./movie-item.scss";
import defaultImage from "../../assets/image/no-image.png";
import { MOVIES_IMG_LINK } from "../../core/constants";

const MovieItem: FC<MovieItemProps> = ({ movie }) => {
    const { title, poster_path, release_date, vote_average, vote_count, id } =
        movie || {};

    return (
        <Grid component='div' size={1}>
            <Link to={`/${id}`} className='movie-item__link'>
                <Card className='movie-item'>
                    <CardMedia
                        component='img'
                        height='200'
                        image={
                            poster_path
                                ? `${MOVIES_IMG_LINK}/${poster_path}`
                                : defaultImage
                        }
                        alt={title}
                        className='movie-item__img'
                    />
                    <CardContent className='movie-item__content'>
                        <Typography className='movie-item__title' variant='h6'>
                            {title || "Unknown Title"}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            className='movie-item__details'
                        >
                            Date: {release_date || "Not available"}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            className='movie-item__details'
                        >
                            Rating: {vote_average || "N/A"} ({vote_count} votes)
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};
const _MovieItem = memo(MovieItem);

export { _MovieItem as MovieItem };

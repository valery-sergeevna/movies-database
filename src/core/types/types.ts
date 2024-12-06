export enum StatusRequest {
    IDLE = "IDLE",
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "REJECTED",
}
export interface MovieItemType {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    vote_count: number;
    backdrop_path?: string;
    overview?: string;
    original_language?: string;
}

export interface MovieState {
    data: MovieItemType[];
    totalPages: number;
    totalResults: number;
    currentPage: number;
    status: StatusRequest;
    error: string | null;
    query: string;
}

export interface MovieDetailsState {
    data: MovieItemType | null;
    status: StatusRequest;
    error: string | null;
}

export interface MovieItemProps {
    movie: MovieItemType;
}

export type TestRootState = {
    movies: MovieState;
};

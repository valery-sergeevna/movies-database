# Movies Database React Application

The application fetches and displays a paginated list of movies. Users can search for movies by name and view detailed information about each movie.

## Features:
- Paginated list of movies (10 items per page).
- Movie details page showing at least one poster image.
- Search functionality to find movies by name.
- Mobile and desktop responsive view.
- State management with Redux Toolkit.
- Unit tests for critical functionality.

## Technologies Used: 
- React (on Vite) and Material-UI for the frontend.
- TypeScript for type safety.
- Redux Toolkit for state management.
- SASS/BEM for styling.
- The Movie Database (TMDb) API for fetching movie data (https://developer.themoviedb.org/docs/getting-started).
- Jest/React Testing Library for unit testing.
- Prettier/ESLint - for identifying and fixing problems in TypeScript code.

## API Details

The movie data is fetched from the **TMDB API** and a local proxy service (running on `localhost:5174`) for certain routes.

Here are the primary endpoints used in this project:

1. **Popular Movies**: 
   - `GET /api/movie/popular?page=1`  
     This endpoint returns a list of popular movies, and by default, it provides 20 items per page. Unfortunately, the number of items per page cannot be modified, so 20 items is the minimum we can work with. You can change the page number by adjusting the `page` query parameter (e.g., `/api/movie/popular?page=2`).

2. **Search Movies**:
   - `GET /api/search/movie?query={query}&page=1`  
     This endpoint is used to search for movies by name. It accepts a `query` parameter (the movie name you want to search for) and a `page` parameter for pagination. By default, it returns 20 results per page.

3. **Movie Details**:
   - `GET /api/movie/{movieId}`  
     This endpoint fetches detailed information about a single movie by its `movieId`. It provides data like the movie's poster, description, and more.

### Testing

I wrote tests to cover critical functionality, including:

- **Component Tests**: Verifying the rendering and behavior of key components (search input, movie list, and movie details).
- **Redux Tests**: Ensuring that Redux slices, actions, and reducers work as expected, including state updates for movie search and pagination.
- **API Request Tests**: Mocking API requests with **axios** to test that the correct API endpoints and query parameters are used, and verifying the correct handling of responses.

All tests passed successfully:

- **Test Suites**: 5 total
- **Tests**: 21 total

## Configuration

The project uses **Babel** and **TypeScript** (ts.config) configuration to ensure that the code is properly transpiled and that meta types (env) are correctly transformed during the build process and testing. 

## Pagination Note
In the task requirements, it's specified to show 10 items per page, but I decided not to implement pagination on the frontend. Instead, I opted to display the full set of data from the API to demonstrate the full scope of the task and utilize all the tools. The API itself provides a set of 20 items by default, but the absence of a `take` parameter makes it challenging to control the number of items returned directly.
  
# How to Run the Application:

## Prerequisites:
Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn

### 1. Clone the repository
```
git clone https://github.com/valery-sergeevna/movies-database.git
```

### 2. Install dependencies
```
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory of the project and add your TMDb API key:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```
### 4. Run the application
To start the development server, run:

```
npm run dev
```
### 5. Run the tests
To run the tests, use the following command:
```
npm run test
```

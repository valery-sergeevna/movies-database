import { MovieDetailsPage, MoviesPage } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/main.scss";
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MoviesPage />} />
                <Route path='/:movieId' element={<MovieDetailsPage />} />
            </Routes>
        </Router>
    );
}
export { App };

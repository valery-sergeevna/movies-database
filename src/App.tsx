import { HomePage } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { memo } from "react";
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
        </Router>
    );
}
const _App = memo(App);

export { _App as App };

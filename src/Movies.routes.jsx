import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInfo from "./pages/MovieInfo";
import App from "./pages/App";

function MovieRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="movie/:title_id" element={<MovieInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default MovieRoutes;

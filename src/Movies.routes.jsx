import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInfo from "./pages/MovieInfo";
import App from "./App";

function MovieRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="movie/:title_id" element={<MovieInfo />}></Route>
        <Route path="movie/" element={<MovieInfo />}></Route>
      </Routes>
    </Router>
  );
}

export default MovieRoutes;

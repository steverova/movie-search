import { useState } from "react";
import { searchMovies } from "../services/movies.services";

export const useMovies = (search) => {
  const [movies, setMovies] = useState([]);
  const [totalRes, setTotalResult] = useState(0)
  const getMovies = async () => {
    const {movies, totalResults} = await searchMovies(search);
    setMovies(movies);
    setTotalResult(totalResults);
  };

  return { movies, getMovies, totalRes };
};

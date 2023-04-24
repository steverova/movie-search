import { useState } from "react";
import { searchMovies } from "../services/movies.services";

export const useMovies = (search) => {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const reqmovies = await searchMovies(search.searchValue);
    setMovies(reqmovies);
  };

  return { movies, getMovies };
};

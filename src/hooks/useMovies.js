import { useState } from "react";
import { searchMovies } from "../services/movies.services";

export const useMovies = (search) => {
  const [movies, setMovies] = useState([]);
  const [totalRes, setTotalResult] = useState(0);

  console.log(search.searchValue.length);

  const getMovies = async () => {
    const { movies, totalResults } = await searchMovies(search);
    setMovies(movies);
    setTotalResult(totalResults);

    // if (search.searchValue.length >= 1) {
    //   const { movies, totalResults } = await searchMovies(search);
    //   setMovies(movies);
    //   setTotalResult(totalResults);
    //   console.log("Buscar")
    // } else {
    //   console.log("Todas")
    //   const { movies, totalResults } = await moviesByYear(search);
    //   console.log(movies)
    //   setMovies(movies);
    //   setTotalResult(totalResults);
    // }
  };

  return { movies, getMovies, totalRes };
};

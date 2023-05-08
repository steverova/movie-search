import { useState } from "react";
import { moviesByYear } from "../services/movies.services";

export const useByYear = (year) => {
  const [moviesYear, setMovies] = useState([]);
  const [totalResYear, setTotalResult] = useState(0);
  const getMoviesYear = async () => {
    const [ moviesYear, totalResultsYear ] = await moviesByYear(year);

    console.log(moviesYear);

    setMovies(moviesYear);
    setTotalResult(totalResultsYear);
  };

   

  return { moviesYear, getMoviesYear, totalResYear };
};

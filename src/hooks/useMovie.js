import { useState } from "react";
import { getMovieById } from "../services/movies.services";

export const useMovie = (title_id) => {
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const movie  = await getMovieById(title_id);
    setMovie(movie.movie);
  };

  return { movie, getMovie };
};

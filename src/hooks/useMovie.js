import { useState } from "react";
import { getMovieById } from "../services/movies.services";

export const useMovie = (title_id) => {
  console.log("entro a useMovie", title_id);
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {

    console.log("getMovie funtion");

    const movie  = await getMovieById(title_id);

    console.log(movie.movie);

    setMovie(movie.movie);
  };

  return { movie, getMovie };
};

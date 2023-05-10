import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import coverNotFound from "../assets/cover.png"

export const MovieList = ({ movies }) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <Link key={movie.id} to={`movie/${movie.id}`}>
          <article className="movie">
            <div className="title_movie">
              <span>{movie.title + " (" + movie.year + ") "}</span>
            </div>
            <div className="image-container">
              <img className="image"
                src={
                  movie.poster === "N/A"
                    ? coverNotFound
                    : movie.poster
                }
                alt={movie.title}
              />
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export const NoResult = () => {
  return <p>No results, enter a value for the search </p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MovieList movies={movies} /> : <NoResult />;
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ),
};

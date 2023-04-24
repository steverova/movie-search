export const MovieList = ({ movies }) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <article className="movie" key={movie.id}>
          <div className="title_movie">
            <p>{movie.title}</p>
            <p>{movie.year}</p>
          </div>
          <div className="image-container">
          <img src={movie.poster} alt={movie.title} />
          </div>
          
        </article>
      ))}
    </div>
  );
};

export const NoResult = () => {
  return <p>No results</p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MovieList movies={movies} /> : <NoResult />;
};

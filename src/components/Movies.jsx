export const MovieList = ({ movies }) => {
  return (
    <div className="movies">
      {movies.totalResults}
      {movies.map((movie) => (
        <article className="movie" key={movie.id}>
          <div className="title_movie">
            <span>{movie.title +" - "+ movie.year}</span>
          </div>
          <div className="image-container">
          <img src={movie.poster === "N/A" ? 'https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg' : movie.poster} alt={movie.title} />
          </div>
        </article>
      ))}
    </div>
  );
};

export const NoResult = () => {
  return <p>No results, enter a value for the search </p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <MovieList movies={movies} /> : <NoResult />;
};

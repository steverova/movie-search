const API_KEY = "4287ad07";

export const searchMovies = async (search) => {
  console.log("entro a searchMovies");
  if (search === "") return null;
  try {
    const data = await fetch(
      //   `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.searchValue}&type=movie&page=${search.page}`
    );
    const json = await data.json();
    const moviesjson = await json.Search;
    const totalResults = json.totalResults;

    console.log(totalResults);

    const movies = moviesjson?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return { movies, totalResults };
  } catch (error) {
    throw new Error("Error Searching movies");
  }
};

export const getMovieById = async (title_id) => {
  try {
    const data = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${title_id}`
    );

    const result = await data.json();

    const movie = {
      title: result?.Title,
      year: result?.Year,
      rated: result?.Rated,
      released: result?.Released,
      runtime: result?.Runtime,
      genre: result?.Genre,
      director: result?.Director,
      writer: result?.Writer,
      actors: result.Actors,
      plot: result?.Plot,
      language: result?.Language,
      country: result?.Country,
      awards: result?.Awards,
      poster: result?.Poster,
    };

    return { movie };
  } catch (error) {
    throw new Error("Error getting movie: ", error);
  }
};

export const moviesByYear = async (search) => {
  try {
    const data = await fetch(
      //   `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      `https://www.omdbapi.com/?apikey=4287ad07&s=movie&y=${search.year}&type=movie&page=${search.page}`
    );
    const json = await data.json();
    const moviesjson = await json.Search;
    const totalResults = json.totalResults;

    const movies = moviesjson?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

     return { movies, totalResults };
  } catch (error) {
    throw new Error("Error Searching movies");
  }
};

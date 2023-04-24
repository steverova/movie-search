const API_KEY = "4287ad07";

export const searchMovies = async (search) => {
  if (search === "") return null;

  console.log(search.searchValue);
  console.log(search.page);
  console.log(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.searchValue}&type=movie&page=${search.page}`)

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

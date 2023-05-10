import { useEffect, useState } from "react";
import "../assets/css/App.css";
import { Movies } from "../components/Movies";
import { useMovies } from "../hooks/useMovies";
import * as yup from "yup";
import Footer from "../components/Footer";
import Moviefranchise from "../mocks/Moviefranchise";
import PaginationCustom from "../components/PaginationCustom";
import SearchBar from "../components/SearchBar";

function App() {
  const [searchValue, setSearchValue] = useState({
    searchValue:
      Moviefranchise[Math.floor(Math.random() * Moviefranchise.length)],
    year: 2023,
    page: 1,
  });
  const [activePage, setActivePage] = useState(1);
  const [errors, setErrors] = useState("");
  const { movies: mappedMovies, getMovies, totalRes } = useMovies(searchValue);

  const schema = yup.object({
    searchValue: yup.string().required("This field is required"),
  });

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue.page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue((searchValue) => ({ ...searchValue, page: 1 }));
    setActivePage(1);
    schema
      .validate(searchValue)
      .then(() => {
        getMovies();
      })
      .catch((err) => setErrors(err));
  };

  const clickPage = (index) => {
    setSearchValue((searchValue) => ({ ...searchValue, page: index }));
    setActivePage(index);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchValue({ ...searchValue, [name]: value, page: 1 });
    setErrors("");
  };

  return (
    <>
      <div>
        <header>
          <h1 style={{ color: "#ff5148" }}>Movie Search OMDB</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", width: "100%" }}>
              <SearchBar
                value={searchValue.searchValue || ""}
                onChange={handleChange}
                errors={errors}
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </header>

        <main className="page">

          <PaginationCustom
            totalResult={totalRes}
            maxButtons={2}
            onPageChange={clickPage}
            activePage={activePage}
          />

          <Movies movies={mappedMovies} />

          <PaginationCustom
            totalResult={totalRes}
            maxButtons={2}
            onPageChange={clickPage}
            activePage={activePage}
          />
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

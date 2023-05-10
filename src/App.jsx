import { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import * as yup from "yup";
import Footer from "./components/Footer";
import Moviefranchise from "./mocks/Moviefranchise";
import Pagination from "./components/Pagination";

function App() {
  const [searchValue, setSearchValue] = useState({
    searchValue: Moviefranchise[Math.floor(Math.random() * Moviefranchise.length) + 1],
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
            <div style={{ width: "100%" }} className="search-group">
              <input
                style={{
                  width: "100%",
                  border: errors && "1px solid transparent",
                  borderColor: errors && "#ff5148",
                  color: errors && "#ff5148",
                }}
                className={errors.errors ? "error" : ""}
                name="searchValue"
                value={searchValue.searchValue || ""}
                onChange={handleChange}
                type="text"
                placeholder={
                  errors.errors
                    ? errors.errors + "!!"
                    : "Avengers, John Wick, Avatar..."
                }
              />
              <button type="submit">Search</button>
            </div>
            <div></div>
          </form>
        </header>
        <main className="page">
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <ul
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            ></ul>
            <Pagination
              totalResult={totalRes}
              maxButtons={2}
              onPageChange={clickPage}
              activePage={activePage}
            />
          </div>
          <div>
  
          </div>
          <Movies movies={mappedMovies} />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <ul
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              <Pagination
                totalResult={totalRes}
                maxButtons={2}
                onPageChange={clickPage}
                activePage={activePage}
              />
            </ul>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

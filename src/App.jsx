import { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import * as yup from "yup";
import Pagination from "./components/Pagination";

function App() {
  const [searchValue, setSearchValue] = useState({
    searchValue: "avengers",
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

    const currentYear = new Date().getFullYear();
    // Generar opciones desde 1930 hasta el año actual
    const options = [];
    for (let year = currentYear; year >= 1930; year--) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    // Establecer las opciones en el estado
  }, [searchValue.page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue((searchValue) => ({ ...searchValue, page: 1 }));
    setActivePage(1);
    schema
      .validate(searchValue)
      .then((valid) => {
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

  const pagination = (
    <Pagination
      totalResult={Math.ceil(totalRes / 10)}
      maxButtons={2}
      onPageChange={clickPage}
      activePage={activePage}
    />
  );

  return (
    <>
      <div>
        <header>
          <h1 style={{ color: "#ff5148" }}>Movie Search</h1>
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
            <p>
              {" "}
              {totalRes ? "Showing " + totalRes + " results" : "No results"}
            </p>
            <ul
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            ></ul>
            {pagination}
          </div>
          <Movies movies={mappedMovies} />
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <ul
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              {pagination}
            </ul>
            <p> {totalRes ? "total de resultados: " + totalRes : ""}</p>
          </div>
        </main>
        <hr></hr>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            className="text-decoration-none"
            href="https://github.com/steverova"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              style={{ width: "30px" }}
              className="ms-3"
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;

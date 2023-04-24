import { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import * as yup from "yup";
import ReactPaginate from 'react-paginate';

function App() {
  const [searchValue, setSearchValue] = useState({ searchValue: "", page: 1 });
  const [activePage, setActivePage] = useState(1);
  const [errors, setErrors] = useState("");
  const { movies: mappedMovies, getMovies, totalRes } = useMovies(searchValue);

  const schema = yup.object({
    searchValue: yup.string().required("This field is required"),
  });

  useEffect(() => {
    getMovies();
  }, [searchValue.page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue((searchValue) => ({ ...searchValue, page: 1 }));
    setActivePage(1);
    schema
      .validate(searchValue)
      .then((valid) => {
        console.log(valid);
        getMovies();
      })
      .catch((err) => setErrors(err));
  };

  const clickPage = (index) => {
    setSearchValue((searchValue) => ({ ...searchValue, page: index }));
    console.log(searchValue);
    setActivePage(index);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchValue({ ...searchValue, [name]: value, page: 1 });
    setErrors("");
  };

  const pagination = () => {
    const elements = [];
    for (let i = 1; i < totalRes / 10 + 1; i++) {
      elements.push(
        <button
          style={{ backgroundColor: activePage === i ? "#ff5148" : "" }}
          key={i}
          onClick={() => clickPage(i)}>
          {i}
        </button>
      );
    }
    return elements;
  };

  return (
    <>
      <div>
        <header>
          <h1>Movie Search</h1>
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
            <ul style={{ display: "flex",flexWrap: 'wrap'  }}>{pagination()}</ul>
          </div>

          <Movies movies={mappedMovies} />

          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <ul style={{ display: "flex" }}>{pagination()}</ul>
            <p> {totalRes ? "total de resultados: " + totalRes : ""}</p>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;

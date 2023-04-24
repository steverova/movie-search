import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import * as yup from "yup";

function App() {
  const [searchValue, setSearchValue] = useState({});

  const [errors, setErrors] = useState("");
  const { movies: mappedMovies, getMovies } = useMovies(searchValue);

  const schema = yup.object({
    searchValue: yup.string().required("This field is required"),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    schema
      .validate(searchValue)
      .then((valid) => {
        console.log(valid);
        getMovies();
      })
      .catch((err) => setErrors(err));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchValue({ ...searchValue, [name]: value });
    setErrors("");
  };

  return (
    <>
      <div >
        <header>
          <h1>Movie Search</h1>
          <form onSubmit={handleSubmit}>
            <div style={{width: "100%"}} className="search-group">
              <input
                style={{
                  width: "100%",
                  border: errors && "1px solid transparent",
                  borderColor: errors && "#ff7676",
                  color: errors && "#ff7676", // Agrega esto para cambiar el color del texto del input cuando hay un error
                }}
                className={errors.errors ? "error" : ""} // Agrega la clase "error" cuando hay un error
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
          <Movies movies={mappedMovies} />
        </main>
      </div>
    </>
  );
}

export default App;

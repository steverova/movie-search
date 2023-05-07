import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import MovieRoutes from "./Movies.routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieRoutes />
  </React.StrictMode>
);

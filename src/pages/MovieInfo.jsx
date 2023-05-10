/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import ActorList from "../components/ActorList";
import Badges from "../components/Badges";
import "../assets/loader.css";
import Footer from "../components/Footer";
import coverNotFound from "../assets/cover.png";
import "../assets/css/movie.css";
import "../assets/css/rating.css";

export default function MovieInfo() {
  let { title_id } = useParams();

  const { movie, getMovie } = useMovie(title_id);

  useEffect(() => {
    setTimeout(() => {
      getMovie();
    }, 1000);
  }, []);

  return (
    <>
      {movie.length !== 0 ? (
        <div className="container-fluid">
          <div className="row">
            <article className="movie-enter">
              <p style={{ fontSize: "30px", textAlign: "center" }}>
                <i className="fa-solid fa-film"></i>

                <span style={{ marginLeft: "10px" }}>
                  {movie.title} ({movie.year})
                </span>
              </p>
            </article>

            <article style={{ marginTop: "10px" }}>
              <div className="row movie-enter">
                <div
                  style={{
                    textAlign: "center",
                  }}
                  className="col-md-6 p-5 pb-0"
                >
                  <div className="">
                    <img
                      style={{ height: "500px", objectFit: "cover" }}
                      src={
                        movie.poster === "N/A" ? coverNotFound : movie.poster
                      }
                      alt={movie.title}
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div
                      className="Stars"
                      style={{ "--rating": `${movie.rating}` }}
                    ></div>
                    <p style={{ direction: "flex", justifyItems: "center" }}>
                      {movie.rating} <strong>- IMdb</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex col-md-6 p-5">
                  <div>
                    <p style={{ fontSize: "1.1em" }}>{movie.plot}</p>

                    <hr></hr>

                    {movie && (
                      <div>
                        <ActorList
                          title={"Director"}
                          actors={movie.director}
                          icon={<i className="fa-solid fa-clapperboard"></i>}
                        ></ActorList>
                        <ActorList
                          title={"Writer"}
                          actors={movie.writer}
                          icon={<i className="fa-solid fa-feather"></i>}
                        ></ActorList>

                        <ActorList
                          title={"Actors"}
                          actors={movie.actors}
                          icon={<i className="fa-solid fa-user-large"></i>}
                        ></ActorList>

                        <p style={{ color: "#c7e9b0" }}>
                          <i className="fa-solid fa-sack-dollar"></i>
                          <strong style={{ marginLeft: "10px" }}>
                            BoxOffice:
                          </strong>{" "}
                          {movie.boxOffice}
                        </p>
                      </div>
                    )}

                    <hr></hr>

                    <div style={{ marginTop: "10px" }}>
                      <Badges
                        badges={[
                          movie.rated,
                          movie.released,
                          movie.runtime,
                          movie.country,
                          movie.language,
                          movie.genre,
                        ]}
                      ></Badges>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              style={{
                marginTop: "20px",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link to="/">
                <div>
                  <i className="fa-solid fa-house fa-2x"></i>
                </div>
              </Link>

              <div>
                <a target="blank" href={`https://www.imdb.com/title/${title_id}`}>
                  <i className="fa-brands fa-imdb fa-3x"></i>
                </a>
              </div>
            </article>
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <div className="container-fluid center">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

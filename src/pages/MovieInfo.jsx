import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import ActorList from "../components/ActorList";
import Badges from "../components/Badges";
import "../assets/loader.css";
import Footer from "../components/Footer";

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
        <div
          style={{ padding: "0px 0px 60px 0px" }}
          className="container-fluid "
        >
          <div style={{ marginTop: "20px" }} className="row">
            <article>
              <p style={{ fontSize: "30px", textAlign: "center" }}>
                {movie.title} ({movie.year})
              </p>
            </article>

            <article style={{ marginTop: "10px" }}>
              <div className="row">
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  className="col-md-6"
                >
                  <img
                    src={
                      movie.poster === "N/A"
                        ? "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
                        : movie.poster
                    }
                    alt={movie.title}
                  />
                </div>

                <div className="col-md-6">
                  <div style={{ marginTop: "30px" }}>
                    <p style={{ fontSize: "1.1em" }}>{movie.plot}</p>

                    <hr></hr>

                    {movie && (
                      <div>
                        <ActorList
                          title={"Director"}
                          actors={movie.director}
                        ></ActorList>
                        <ActorList
                          title={"Writer"}
                          actors={movie.writer}
                        ></ActorList>
                        <ActorList
                          title={"Actors"}
                          actors={movie.actors}
                        ></ActorList>
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
            <Link to="/">
              <article
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <i className="fa-solid fa-house fa-2x"></i>
                </div>
                <div>
                  <a
                    target="blank"
                    href={`https://www.imdb.com/title/${title_id}`}
                  >
                    <i className="fa-brands fa-imdb fa-3x"></i>
                  </a>
                </div>
              </article>
            </Link>
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

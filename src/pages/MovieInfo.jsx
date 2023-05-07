import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovie } from "../hooks/useMovie";
import ActorList from "../components/ActorList";
import Badges from "../components/Badges";

export default function MovieInfo() {
  let { title_id } = useParams();

  const { movie, getMovie } = useMovie(title_id);

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div style={{ marginTop: "20px" }} className="row">
          <article>
            <p style={{ fontSize: "30px", textAlign: "center" }}>
              {movie.title} ({movie.year})
            </p>
          </article>

          <article style={{ marginTop: "10px" }}>
            <div className="row">
              <div style={{ textAlign: "center" }} className="col-md-6">
                <img src={movie.poster} alt={movie.title} />
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
            <article style={{ marginTop: "20px", textAlign: "center" }}>
              <i className="fa-solid fa-house fa-2x"></i>
            </article>
          </Link>
        </div>
      </div>
    </>
  );
}

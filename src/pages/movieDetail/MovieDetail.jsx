import "./movieDetail.scss";
import Narbar from "../../components/narbar/Narbar";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useLocation, useNavigate } from "react-router-dom";
import FootBar from "../../components/footBar/FootBar";
import { useEffect } from "react";
import Comments from "../../components/comments/Comments";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const movie = state && (state.movie || state.content || state.item);
  const movieTitle = movie.title ? movie.title : "The Fanime";

  console.log(movie);

  useEffect(() => {
    document.title = movieTitle;
  }, [movieTitle]);

  const handleWatchClick = () => {
    if (movie && movie._id) {
      navigate(`/watch/${movie._id}`, { state: { movie } });
    }
  };

  return (
    <>
      <Narbar />
      <div className="movie_card" id="tomb">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={movie.img} />
            <h1>{movie.title}</h1>
            <h4>
              {movie.year}
              {movie.isSeries ? ", Series" : ", Movies"}
            </h4>
            <span className="minutes">
              {movie.isSeries ? "24 phút" : "1 giờ 30 phút"}
            </span>
            <p className="type">{movie.genre}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{movie.desc}</p>
          </div>
          <div className="movie_social">
            <ul>
              <li onClick={handleWatchClick}>
                <PlayArrowIcon className="material-icons" />
              </li>
              <li>
                <ShareIcon className="material-icons" />
              </li>
              <li>
                <FavoriteIcon className="material-icons" />
              </li>
            </ul>
          </div>
        </div>
        <div className="blur_back tomb_back">
          <img src={movie.imgSm} alt="" />
        </div>
      </div>
      <Comments movieID={movie._id} />
      <FootBar />
    </>
  );
};

export default MovieDetail;

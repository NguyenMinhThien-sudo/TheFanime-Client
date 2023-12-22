import "./movieDetail.scss";
import Narbar from "../../components/narbar/Narbar";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useLocation, useNavigate } from "react-router-dom";
import FootBar from "../../components/footBar/FootBar";
import { useEffect } from "react";
import Comments from "../../components/comments/Comments";
import useWarningToast from "../../components/warningToastHook/useWarningToast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useWarningFavorite from "../../components/warningToastHook/useWarningFavorite";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const movie = state && (state.movie || state.content || state.item);
  const movieTitle = movie.title ? movie.title : "The Fanime";

  const { ToastContainer, toastWarn } = useWarningToast();
  const { favoriteWarn } = useWarningFavorite();

  const user = JSON.parse(localStorage.getItem("user"));

  const favoriteToast = () => {
    toast.success("🦄 Đã thêm vào danh sách yêu thích!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    document.title = movieTitle;
  }, [movieTitle]);

  const handleAddToFavorites = async () => {
    try {
      if (!user.vip) {
        favoriteWarn();
        return;
      }
      await axios.post(
        "http://localhost:8800/api/users/favorites-add",
        { movieId: movie._id, userId: user._id },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      // console.log(response.data);
      favoriteToast();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleWatchClick = () => {
    if (movie && movie._id) {
      if (!user.vip && movie.isVip) {
        toastWarn();
      }
      if (user.vip && !movie.isVip) {
        navigate(`/watch/${movie._id}`, { state: { movie } });
      }
      if (user.vip && movie.isVip) {
        navigate(`/watch/${movie._id}`, { state: { movie } });
      }
      if (!user.vip && !movie.isVip) {
        navigate(`/watch/${movie._id}`, { state: { movie } });
      }
    }
  };

  return (
    <>
      <Narbar />
      <div className="movie_card" id="tomb">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={movie.img} />
            <div className="detailTitle">
              <h1>{movie.title}</h1>
              {movie.isVip && (
                <div className="vip">
                  <span className="vipText">{!user.vip ? "VIP" : "OK"}</span>
                </div>
              )}
            </div>
            <h4>
              {movie.year}
              {movie.isSeries ? ", phim bộ" : ", phim rạp"}
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
                <FavoriteIcon
                  className="material-icons"
                  onClick={handleAddToFavorites}
                />
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
      <ToastContainer />
    </>
  );
};

export default MovieDetail;

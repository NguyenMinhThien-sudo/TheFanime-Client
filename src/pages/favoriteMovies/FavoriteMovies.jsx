// import axios from "axios";
import { useEffect, useState } from "react";
import "./favoriteMovies.scss";
import axios from "axios";
import Narbar from "../../components/narbar/Narbar";
import FootBar from "../../components/footBar/FootBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpointApi } from "../../Endpoint";

const FavoriteMovies = () => {
  const [favoritesMovie, setFavoritesMovie] = useState([]);
  const { state } = useLocation();
  const id = state;

  const navigate = useNavigate();

  const removeFavoriteToast = () => {
    toast.success("🦄 Đã xóa phim này khỏi danh sách yêu thích!", {
      position: "top-center",
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
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${endpointApi}/api/users/favorites/${id}`,
          {
            params: { id },
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setFavoritesMovie(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [id]);

  const handleRemoveFavorites = async (userId, movieId) => {
    try {
      await axios.post(
        `${endpointApi}/api/users/favorites-remove`,
        {
          userId: userId,
          movieId: movieId,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setFavoritesMovie((prevFavorites) =>
        prevFavorites.filter((movie) => movie._id !== movieId)
      );
      removeFavoriteToast();
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };
  return (
    <>
      <Narbar />
      <div className="allMovies" id="all">
        <span className="allItemsTitle">DANH SÁCH YÊU THÍCH</span>
        {favoritesMovie.length === 0 && (
          <p style={{ paddingTop: "30px", color: "#eaea0c" }}>
            Danh sách của bạn hiện đang trống!
          </p>
        )}
        <div className="allWrapper">
          <div className="allItems">
            {favoritesMovie.map((favoriteMovie) => (
              <>
                <div className="allItem" key={favoriteMovie._id}>
                  <div className="allItemEps">
                    <span
                      onClick={() =>
                        handleRemoveFavorites(id, favoriteMovie._id)
                      }
                    >
                      X
                    </span>
                  </div>
                  <div className="allItemImg">
                    <img src={favoriteMovie.img} alt="" />
                  </div>
                  <div className="allItemGenre">
                    <span>{favoriteMovie.genre}</span>
                  </div>
                  <div
                    className="allItemTitle"
                    onClick={() =>
                      navigate(`/watch/${favoriteMovie._id}`, {
                        state: { favoriteMovie },
                      })
                    }
                  >
                    <span>{favoriteMovie.title}</span>
                  </div>
                  <span className="fullMovieTitle">{favoriteMovie.title}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: "230px" }}></div>
      <FootBar />
      <ToastContainer />
    </>
  );
};

export default FavoriteMovies;

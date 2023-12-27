import "./narbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import axios from "axios";
import { Link } from "react-scroll";
import useScrollY from "../hooks/useScrollY";
import { endpointApi } from "../../Endpoint";
import useWarningFavorite from "../warningToastHook/useWarningFavorite";

const Narbar = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [endpoint, setEndpoint] = useState(
    `${endpointApi}/api/movies/search?title=${query}`
  );
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const { ToastContainer, favoriteWarn } = useWarningFavorite();

  const [scrollY] = useScrollY();
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(endpoint, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovies(res.data?.movies);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };

    const timer = setTimeout(() => {
      getSearchMovie();

      return () => clearTimeout(timer);
    }, 500);
  }, [endpoint]);

  const handleIconClick = () => {
    setInputVisible(!isInputVisible);
  };

  const handleClickHome = () => {
    navigate("/");
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleMenuClick = (item) => {
    setActiveItem(item);
  };

  const handleClickPaypal = () => {
    if (user.vip) {
      window.alert("Bạn hiện đã là thành viên VIP!");
      return;
    }
    navigate("/paypalCheckout");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <div className={scrollY > 0 ? "narbar scrolled" : "narbar"}>
      <div className="container">
        <div className="left">
          <a className="logo" onClick={handleClickHome}>
            TheFANIME
          </a>
          <span
            onClick={() => {
              handleClickHome();
              handleMenuClick("home");
            }}
          >
            Trang Chủ
          </span>
          <Link
            activeClass="active"
            to="lists"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            <span
              className={`${activeItem === "series" ? "isActive" : ""}`}
              onClick={() => {
                navigate("/series");
                handleMenuClick("series");
              }}
            >
              Chiếu Bộ
            </span>
          </Link>
          <Link
            activeClass="active"
            to="lists"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            <span
              className={`${activeItem === "movies" ? "isActive" : ""}`}
              onClick={() => {
                navigate("/movies");
                handleMenuClick("movies");
              }}
            >
              Chiếu Rạp
            </span>
          </Link>
          <Link
            activeClass="active"
            to="all"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <span
              className={`${activeItem === "all" ? "isActive" : ""}`}
              onClick={() => {
                handleMenuClick("all");
                navigate("/");
              }}
            >
              Tất Cả
            </span>
          </Link>
          <span
            className={`${activeItem === "favorite" ? "isActive" : ""}`}
            onClick={() => {
              if (!user.vip) {
                favoriteWarn();
                return;
              }
              navigate(`/favorite/${user._id}`, { state: user._id });
              handleMenuClick("favorite");
            }}
          >
            Yêu Thích
          </span>
        </div>
        <div className="right">
          <div className="movieSearch">
            <button
              onClick={() =>
                setEndpoint(`${endpointApi}/api/movies/search?title=${query}`)
              }
              className="btnSearch"
              style={{
                opacity: isInputVisible ? "1" : "0",
              }}
            >
              Tìm
            </button>
            <input
              className="inputSearch"
              type="text"
              placeholder="Tìm phim..."
              onChange={handleInputChange}
              value={query}
              style={{
                width: isInputVisible ? "400px" : "0",
                opacity: isInputVisible ? "1" : "0",
                transition: "all 0.3s ease-in-out",
                border: "none",
                borderRadius: "5px",
                padding: "7px",
              }}
            />

            {isInputVisible && (
              <ul className="searchResult">
                {query &&
                  (movies.length > 0 ? (
                    movies.map((movie) => (
                      <li
                        key={movie._id}
                        onClick={() =>
                          navigate("/movieDetail", { state: { movie } })
                        }
                      >
                        {loading ? (
                          <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        ) : (
                          <>
                            <img
                              className="imgMovieSearch"
                              src={movie.img}
                              alt={movie.title}
                            />
                            <span className="movieSearchTilte">
                              {movie.title}
                            </span>
                          </>
                        )}
                      </li>
                    ))
                  ) : (
                    <li
                      className="movieSearchTilte"
                      style={{ paddingLeft: "85px" }}
                    >
                      Không tìm thấy kết quả!
                    </li>
                  ))}
              </ul>
            )}
            <SearchIcon
              className={`iconSearch ${isInputVisible ? "actives" : ""}`}
              onClick={handleIconClick}
            />
          </div>
          <span
            className={user.vip ? "vipOption" : "unVipOption"}
            onClick={handleClickPaypal}
          >
            VIP
          </span>
          <NotificationsIcon className="icon" />
          <img
            src={
              user.profilePic ? user.profilePic : "/images/client_avatar.jpg"
            }
            alt=""
            onClick={() => navigate("/personal")}
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <div className="option">
                <AccountCircleIcon className="iconOption" />
                <span onClick={() => navigate("/personal")}>Cá nhân</span>
              </div>
              <div className="option">
                <ExitToAppIcon className="iconOption" />
                <span onClick={handleLogout}>Đăng xuất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Narbar;

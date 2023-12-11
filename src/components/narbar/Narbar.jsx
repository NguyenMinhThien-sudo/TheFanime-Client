import "./narbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import axios from "axios";
import { Link } from "react-scroll";
import useScrollY from "../hooks/useScrollY";

const Narbar = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [endpoint, setEndpoint] = useState(
    `http://localhost:8800/api/movies/search?title=${query}`
  );
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("");

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
            onClick={() => handleMenuClick("favorite")}
          >
            Yêu Thích
          </span>
        </div>
        <div className="right">
          <div className="movieSearch">
            <button
              onClick={() =>
                setEndpoint(
                  `http://localhost:8800/api/movies/search?title=${query}`
                )
              }
              className="btnSearch"
              style={{
                opacity: isInputVisible ? "1" : "0",
                marginRight: "5px",
                padding: "5px",
                width: "50px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "rgb(255, 0, 102)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Tìm
            </button>
            <input
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
          <NotificationsIcon className="icon" />
          <img src="/images/client_avatar.jpg" alt="" />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Thiết lập</span>
              <span onClick={handleLogout}>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Narbar;

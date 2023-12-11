import "./listItem.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const ListItem = ({ index, item }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8800/api/movies/find/" + item,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };
    getMovie();
  }, [item]);
  const handleWatchClick = () => {
    navigate("/movieDetail", { state: { movie } });
  };
  return (
    <div
      className="listItem"
      style={{
        left: isHovered && index * 225 - 50 + index * 2.5,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="listInfo">
            <img src={movie.img} alt="" />
            <span className="titleMovie">{movie.title}</span>
          </div>
          {isHovered && (
            <>
              <video
                className="video"
                autoPlay
                muted
                loop
                src={movie.trailer}
                onClick={handleWatchClick}
              />
              <div className="itemInfo">
                <div className="icons">
                  <PlayArrowIcon className="icon" onClick={handleWatchClick} />
                  <AddIcon className="icon" />
                  <ThumbUpAltOutlinedIcon className="icon" />
                  <ThumbDownOutlinedIcon className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ListItem;

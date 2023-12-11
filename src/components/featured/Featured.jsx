import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8800/api/movies/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(true);
      }
    };
    getRandomContent();
  }, [type]);

  const handleWatchClick = () => {
    if (content && content._id) {
      navigate(`/watch/${content._id}`, { state: { content } });
    }
  };

  const handleDetailClick = () => {
    navigate("/movieDetail", { state: { content } });
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Chiếu Rạp" : "Chiếu Bộ"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Thể Loại</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="fantasy">Fantasy</option>
            <option value="romance">Romance</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}
      {loading && <div className="lds-hourglass"></div>}
      {!loading && <img src={content && content.imgSm} alt="" />}
      <div className="info">
        <span className="imgTitle">{content && content.imgTitle}</span>
        <div className="boxDesc">
          <span className="desc">{content && content.desc}</span>
        </div>
        <div className="buttons">
          <button className="play" onClick={handleWatchClick}>
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more" onClick={handleDetailClick}>
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

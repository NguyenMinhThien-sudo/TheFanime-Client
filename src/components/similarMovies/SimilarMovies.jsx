import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import "./similarMovies.scss";

const SimilarMovies = ({ item, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="similarItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="similarInfo">
          <img src={item.img} alt="" />
          <span className="titleMovie">{item.title}</span>
        </div>
        {isHovered && (
          <>
            <video
              className="video"
              autoPlay
              muted
              loop
              src={item.trailer}
              onClick={onClick}
            />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrowIcon className="icon" />
                <AddIcon className="icon" />
                <ThumbUpAltOutlinedIcon className="icon" />
                <ThumbDownOutlinedIcon className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{item.duration}</span>
                <span className="limit">+{item.limit}</span>
                <span>{item.year}</span>
              </div>
              <div className="desc">{item.desc}</div>
              <div className="genre">{item.genre}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SimilarMovies;

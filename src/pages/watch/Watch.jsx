import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Narbar from "../../components/narbar/Narbar";
import FootBar from "../../components/footBar/FootBar";
import Comments from "../../components/comments/Comments";
import SimilarMovies from "../../components/similarMovies/SimilarMovies";
import axios from "axios";
import { endpointApi } from "../../Endpoint";

const Watch = () => {
  const { state } = useLocation();
  const movie = state && (state.movie || state.content || state.favoriteMovie);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [ep, setEp] = useState(movie.video);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const movieTitle = `${movie.title}${
    movie.isSeries ? ` Tập ${selectedEpisode + 1}` : ""
  }`;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `${endpointApi}/api/movies/similar/${movie._id}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setSimilarMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [movie._id]);

  useEffect(() => {
    document.title = movieTitle;
  }, [movieTitle]);

  useEffect(() => {
    // Kiểm tra xem videoRef.current có null hay không trước khi truy cập currentTime
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, [ep]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    console.log("Video ended!");
    console.log(videoEnded);
    handleAutoNextEpisode();
  };
  // useEffect(() => {
  //   // Lấy giá trị từ Local Storage khi component được tạo
  //   const savedSelectedEpisode = localStorage.getItem("selectedEpisode");
  //   if (savedSelectedEpisode !== 0) {
  //     setSelectedEpisode(parseInt(savedSelectedEpisode));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Lưu giá trị vào Local Storage khi selectedEpisode thay đổi
  //   if (selectedEpisode !== 0) {
  //     localStorage.setItem("selectedEpisode", selectedEpisode.toString());
  //   }
  // }, [selectedEpisode]);

  const handleTimeUpdate = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      setCurrentTime(videoElement.currentTime);
    }
  };

  const handleSetEp = (index) => {
    if (selectedEpisode !== index) {
      setSelectedEpisode(index);
      setEp("");

      setTimeout(() => {
        setEp(movie.video);
      }, 500);

      setVideoEnded(false);
    }
  };

  const handleNextEpisode = () => {
    if (selectedEpisode >= 0 && selectedEpisode < 62 && movie.isSeries) {
      handleSetEp(selectedEpisode + 1);
      setEp("");

      setTimeout(() => {
        setEp(movie.video);
      }, 500);

      setVideoEnded(false);
    }
  };

  const handleAutoNextEpisode = () => {
    handleNextEpisode();
  };

  const handlePreviousEpisode = () => {
    if (selectedEpisode <= 62 && selectedEpisode > 0 && movie.isSeries) {
      setSelectedEpisode(selectedEpisode - 1);
      setEp("");

      setTimeout(() => {
        setEp(movie.video);
      }, 500);

      setVideoEnded(false);
    }
  };

  //Similar
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  // const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const clickLimit = window.innerWidth / 230;

  // console.log(setClickLimit);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (
      direction === "right" &&
      slideNumber < similarMovies.length - clickLimit
    ) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <>
      <Narbar />
      <div className="watchPage">
        <div className="watch">
          <div
            className="back"
            onClick={() => navigate("/movieDetail", { state: { movie } })}
          >
            <ArrowBackOutlinedIcon />
          </div>
          <div className="watchTitle">
            <div className="watchTitleBox">
              <span className="watchTitlePrev">Bạn đang xem: </span>
              <span
                className="watchTitleNext"
                onClick={() => navigate("/movieDetail", { state: { movie } })}
              >
                {movie.title}
              </span>
            </div>
          </div>
          <video
            className="video"
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            controls
            onEnded={handleVideoEnd}
            src={ep}
          />
          <progress
            max={videoRef.current?.duration || 0}
            value={currentTime}
            style={{ opacity: 0 }}
          />
        </div>
      </div>
      <div className="chooseBtns">
        <span
          className="prevBtn"
          onClick={handlePreviousEpisode}
          style={{
            backgroundColor:
              selectedEpisode === 0 ? "#6b6a6a" : "rgb(230, 157, 47)",
            cursor: selectedEpisode === 0 ? "not-allowed" : "pointer",
            color: selectedEpisode === 0 ? "#eee" : "white",
            opacity: selectedEpisode === 0 && "1",
          }}
        >
          {"<"} Tập trước
        </span>
        <span
          className="nextBtn"
          onClick={handleNextEpisode}
          style={{
            backgroundColor:
              selectedEpisode === 62 || !movie.isSeries
                ? "#6b6a6a"
                : "rgb(230, 157, 47)",
            cursor:
              selectedEpisode === 62 || !movie.isSeries
                ? "not-allowed"
                : "pointer",
            color: selectedEpisode === 62 || !movie.isSeries ? "#eee" : "white",
            opacity: selectedEpisode === 62 || (!movie.isSeries && "1"),
          }}
        >
          Tập sau {">"}
        </span>
      </div>
      <div className="epTitle">
        <PlaylistPlayIcon className="iconListEp" />
        <span>Danh sách tập phim</span>
      </div>
      <div className="listEps">
        {movie.isSeries &&
          Array.from({ length: 63 }, (_, index) => (
            <span
              key={index}
              style={{
                backgroundColor: selectedEpisode === index && "crimson",
              }}
              onClick={() => handleSetEp(index)}
            >
              Tập {index + 1}
            </span>
          ))}
        {!movie.isSeries && (
          <span
            onClick={() => setEp(movie.video)}
            style={{ backgroundColor: "crimson" }}
          >
            FULL
          </span>
        )}
      </div>
      <div className="similar">
        <div className="similarBox">
          <span className="similarTitle">Phim Đề Cử</span>
        </div>
        <div className="similarWrapper">
          <ArrowBackIosOutlinedIcon
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            {similarMovies.map((item, index) => (
              <SimilarMovies
                key={item._id}
                item={item}
                index={index}
                onClick={() => navigate("/movieDetail", { state: { item } })}
              />
            ))}
          </div>
          <ArrowForwardIosOutlinedIcon
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
      <Comments movieID={movie._id} />
      <FootBar />
    </>
  );
};

export default Watch;

import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Narbar from "../../components/narbar/Narbar";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import axios from "axios";
import "./home.scss";
import { Link, animateScroll as scroll } from "react-scroll";
import useScrollY from "../../components/hooks/useScrollY";
import AllMovies from "../../components/allMovies/AllMovies";
import FootBar from "../../components/footBar/FootBar";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const [scrollY] = useScrollY();

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        return setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  document.title = "The Fanime";

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div>
      <div className="home">
        <Narbar />
        <Featured type={type} setGenre={setGenre} />
        <div className="listBox">
          {lists.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
        <AllMovies />
        <Link
          className="goToTop"
          activeClass="active"
          to="top"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          onClick={scrollToTop}
          style={{ visibility: `${scrollY > 700 ? "visible" : "hidden"}` }}
        >
          <ArrowCircleUpIcon className="iconGoToTop" />
        </Link>
      </div>
      <FootBar />
    </div>
  );
};

export default Home;

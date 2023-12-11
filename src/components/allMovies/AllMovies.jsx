import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./allMovies.scss";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8800/api/movies/all?page=${currentPage}&pageSize=${pageSize}`
        );
        const { movies, totalMovies } = response.data;
        setMovies(movies);
        setTotalMovies(totalMovies);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(true);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalMovies / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(totalMovies / pageSize));
  };

  return (
    <div className="allMovies" id="all">
      <span className="allItemsTitle">TẤT CẢ</span>
      <div className="allWrapper">
        <div className="allItems">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="allItem"
              onClick={() => navigate("/movieDetail", { state: { movie } })}
            >
              {loading && (
                <div className="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
              {!loading && (
                <>
                  <div className="allItemEps">
                    <span>{movie.isSeries ? "63/104" : "FULL"}</span>
                  </div>
                  <div className="allItemImg">
                    <img src={movie.img} alt="" />
                  </div>
                  <div className="allItemGenre">
                    <span>{movie.genre}</span>
                  </div>
                  <div className="allItemTitle">
                    <span>{movie.title}</span>
                  </div>
                  <span className="fullMovieTitle">{movie.title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          className="paginationButton"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="paginationButton"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {currentPage <= Math.ceil(totalMovies / pageSize) &&
          Array.from(
            { length: Math.ceil(totalMovies / pageSize) },
            (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className="paginationButton"
                  onClick={() => setCurrentPage(pageNumber)}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }
          )}

        {/* {currentPage <= Math.ceil(totalMovies / pageSize) &&
          Array.from(
            { length: Math.ceil(totalMovies / pageSize) },
            (_, index) => (
              <button
                key={index + 1}
                className="paginationButton"
                onClick={() => setCurrentPage(index + 1)}
                disabled={currentPage === length || currentPage === index + 1}
              >
                {index + 1}
              </button>
            )
          )} */}

        <button
          className="paginationButton"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalMovies / pageSize)}
        >
          {">"}
        </button>
        <button
          className="paginationButton"
          onClick={handleLastPage}
          disabled={currentPage === Math.ceil(totalMovies / pageSize)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default AllMovies;

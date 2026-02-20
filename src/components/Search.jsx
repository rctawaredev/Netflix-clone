import { useState } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);


  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const getSearchResults = async () => {

    if (searchText === "") return;

    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {

      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`;
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      const data = await response.json();

      if (!response.ok) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      setMoviesList(data.results);
      setCurrentPage(1);
      setApiStatus(apiStatusConstants.SUCCESS);

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };


  const totalPages = Math.ceil(moviesList.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedMovies = moviesList.slice(startIndex, endIndex);

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-[90vh]">
      <BeatLoader color="#ef4444" />
    </div>
  );

  const renderFailureView = () => (
    <div className="flex flex-col justify-center items-center h-[90vh] text-white">
      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771588535/Background-Complete_yqtj3n.png"
        alt="failure view"
        className="h-50 md:h-60"
      />
      <h1 className="text-white pt-10 text-md md:text-lg">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={getSearchResults}
        className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md mt-5"
      >
        Try Again
      </button>
    </div>
  );

  const renderNoResults = () => (
    <div className="flex flex-col items-center justify-center h-[90vh] text-white">
      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771588828/Group_7394_v64aiu.png"
        alt="no movies"
        className="h-60 md:h-70"
      />
      <p className="text-white text-md md:text-lg">
        Your search for {searchText} did not find any matches.
      </p>
    </div>
  );

  const renderSuccessView = () => {

    if (moviesList.length === 0) {
      return renderNoResults();
    }

    return (
      <>
        <div className="px-6 md:px-[164px] py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedMovies.map(movie => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <img
                src={movie.backdrop_path}
                alt={movie.title}
                className="rounded-lg object-cover hover:scale-105 transition duration-300"
              />
            </Link>
          ))}
        </div>

      
        <div className="flex justify-center items-center gap-4 pb-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❮
          </button>

          <p className="text-white text-sm">
            {currentPage} of {totalPages}
          </p>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      </>
    );
  };

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoadingView();
      case apiStatusConstants.FAILURE:
        return renderFailureView();
      case apiStatusConstants.SUCCESS:
        return renderSuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#181818] min-h-screen">

      <Navbar
        className="bg-[#131313]"
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={getSearchResults}
      />

      {renderView()}

    </div>
  );
};

export default Search;
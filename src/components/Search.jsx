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
      setApiStatus(apiStatusConstants.SUCCESS);

    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  // 🔴 LOADING
  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-[90vh]">
      <BeatLoader color="#ef4444" />
    </div>
  );

  // ❌ FAILURE
  const renderFailureView = () => (
    <div className="flex justify-center items-center h-[90vh] text-white">
      Something went wrong
    </div>
  );

  // ❌ NO RESULTS
  const renderNoResults = () => (
    <div className="flex flex-col items-center justify-center h-[90vh] text-white">
      <p>Your search for {searchText} did not find any matches.</p>
    </div>
  );

  // ✅ SUCCESS
  const renderSuccessView = () => {

    if (moviesList.length === 0) {
      return renderNoResults();
    }

    return (
      <div className="px-6 md:px-[164px] py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {moviesList.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="rounded-lg object-cover hover:scale-105 transition duration-300"
            />
          </Link>
        ))}
      </div>
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
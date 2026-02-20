import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Popular = () => {
  const [popularData, setPopularData] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const moviesPerPage = 8;
  const totalPages = Math.ceil(allMovies.length / moviesPerPage);

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = "https://apis.ccbp.in/movies-app/popular-movies";
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (!response.ok || !data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      setAllMovies(data.results);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = allMovies.slice(startIndex, endIndex);
    setPopularData(paginatedMovies);
  }, [currentPage, allMovies]);

  const renderLoadingView = () => (
    <>
      <Navbar className="bg-[#131313]" />

      <div className="h-[90vh] flex justify-center items-center px-6 md:px-[164px]">
        <div className="flex justify-center items-center bg-[#0D0D0D] w-full max-w-6xl h-[213px] md:h-[466px] rounded-lg">
          <BeatLoader color="#ef4444" />
        </div>
      </div>
    </>
  );

  const renderFailureView = () => (
    <>
      <Navbar className="bg-[#131313]" />

      <div className="h-[90vh] flex justify-center items-center px-6 md:px-[164px]">
        <div className="flex flex-col gap-5 justify-center items-center bg-[#0D0D0D] w-full max-w-6xl h-[213px] md:h-[466px] rounded-lg">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
            alt="failure view"
            className="h-6"
          />
          <p className="text-white text-xs md:text-lg text-center">
            Something went wrong. Please try again
          </p>
          <button
            onClick={getPopularMovies}
            className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );

  const renderSuccessView = () => (
    <>
      <Navbar className="bg-[#131313] fixed top-0 left-0 right-0 z-50" />

      <div className="pt-[100px] px-6 md:pt-30 md:px-[164px] pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {popularData.map((movie) => (
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="w-full h-[120px] md:h-[170px] rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❮
          </button>

          <p className="text-white text-sm">
            {currentPage} of {totalPages}
          </p>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border border-white text-white px-3 py-1 rounded disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      </div>

      <div className="flex justify-center py-10">
        <ul className="flex flex-col items-center gap-3">
          <li className="flex gap-5">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>
            <a
              href="https://x.com/NetflixIndia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>
            <a
              href="https://www.instagram.com/netflix_in/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>
            <a
              href="https://www.youtube.com/@NetflixIndiaOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="md:text-2xl text-xl text-white hover:text-red-500 transition duration-200" />
            </a>
          </li>
          <li>
            <p className="text-white md:text-[20px] font-extrabold hover:text-blue-500 transition duration-200">
              Contact us
            </p>
          </li>
        </ul>
      </div>
    </>
  );

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

  return <div className="bg-[#181818] min-h-screen">{renderView()}</div>;
};

export default Popular;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import { BeatLoader } from "react-spinners";
import { FaInstagram, FaGoogle } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const MovieDetails = () => {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  // 🎬 FETCH MOVIE DETAILS
  const getMovieDetails = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = `https://apis.ccbp.in/movies-app/movies/${id}`;
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (!response.ok || !data.movie_details) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const movie = data.movie_details;

      setMovieData({
        title: movie.title,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        genres: movie.genres,
        spokenLanguages: movie.spoken_languages,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        budget: movie.budget,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
      });

      // ✅ FIXED
      setSimilarMovies(movie.similar_movies);

      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  // 🔴 LOADING VIEW
  const renderLoadingView = () => (
    <>
      <Navbar className="bg-[#131313]" />
      <div className="flex justify-center px-6 md:px-[164px] py-10 h-[90vh]">
        <div className="flex justify-center items-center py-16 bg-[#0D0D0D] w-full max-w-6xl rounded-lg">
          <BeatLoader color="#ef4444" />
        </div>
      </div>
    </>
  );

  // ❌ FAILURE VIEW
  const renderFailureView = () => (
    <>
      <Navbar className="bg-[#131313]" />
      <div className="flex justify-center px-6 md:px-[164px] h-[90vh] py-10">
        <div className="flex flex-col gap-5 justify-center items-center py-10 px-6 bg-[#0D0D0D] w-full max-w-6xl rounded-lg">
          <img
            src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
            alt="failure"
            className="h-10"
          />
          <h1 className="text-white text-md md:text-lg text-center">
            Something went wrong. Please try again
          </h1>
          <button
            onClick={getMovieDetails}
            className="bg-white text-black text-xs md:text-md px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );


    const renderFooter = () => {
      return (
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
              <a href="https://www.linkedin.com/in/rctaware/">
                <h1 className="text-white md:text-[20px] font-extrabold hover:text-blue-500 transition duration-200">
                  Contact Us
                </h1>
              </a>
            </li>
          </ul>
        </div>
      );
    };

  // ✅ SUCCESS VIEW
  const renderSuccessView = () => {
    const hours = Math.floor((movieData.runtime || 0) / 60);
    const minutes = (movieData.runtime || 0) % 60;
    const year = movieData.releaseDate?.slice(0, 4);

    return (
      <>
        {/* NAVBAR */}
        <Navbar className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-50" />

        {/* HERO */}
        <div
          className="w-full h-[80vh] md:h-[90vh] flex flex-col justify-end bg-no-repeat bg-cover bg-center px-6 md:px-[164px] pb-10 md:pb-16"
          style={{
            backgroundImage: `
              linear-gradient(
                180deg,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.5) 40%,
                #181818 95%
              ),
              url(${movieData.backdropPath})
            `,
          }}
        >
          <div className="max-w-[600px]">
            <h1 className="text-white text-[28px] md:text-[48px] font-bold mb-2">
              {movieData.title}
            </h1>

            {/* RUNTIME + YEAR */}
            <div className="flex items-center gap-3 text-white text-sm mb-3">
              <p>
                {hours}h {minutes}m
              </p>
              <p className="border px-2 rounded-sm">U/A</p>
              <p>{year}</p>
            </div>

            <p className="text-white text-sm md:text-base mb-4">
              {movieData.overview}
            </p>

            <button className="bg-white text-black rounded-md h-9 px-6">
              Play
            </button>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="px-6 md:px-[164px] py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <div>
            <p className="text-[#94A3B8] mb-2">Genres</p>
            {movieData.genres?.map((each) => (
              <p key={each.id}>{each.name}</p>
            ))}
          </div>

          <div>
            <p className="text-[#94A3B8] mb-2">Audio Available</p>
            {movieData.spokenLanguages?.map((each) => (
              <p key={each.id}>{each.english_name}</p>
            ))}
          </div>

          <div>
            <p className="text-[#94A3B8] mb-2">Rating Count</p>
            <p>{movieData.voteCount}</p>

            <p className="mt-2 text-[#94A3B8]">Rating Average</p>
            <p>{movieData.voteAverage}</p>
          </div>

          <div>
            <p className="text-[#94A3B8] mb-2">Budget</p>
            <p>{movieData.budget}</p>

            <p className="mt-2 text-[#94A3B8]">Release Date</p>
            <p>{movieData.releaseDate}</p>
          </div>
        </div>

        {/* MORE LIKE THIS */}
        <div className="px-6 md:px-[164px] pb-10">
          <h1 className="text-white text-[16px] md:text-[24px] mb-4">
            More like this
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarMovies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-full h-[120px] md:h-[170px] rounded-lg object-cover hover:scale-105 transition duration-300"
                />
              </Link>
            ))}
          </div>
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

  return(

    <div className="bg-[#181818] min-h-screen">
    {renderView()}
    {renderFooter()}
    </div>


  ) 
}

export default MovieDetails;
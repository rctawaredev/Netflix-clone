import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

import { Link } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react'


const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Trending = () => {
  const [trendingNowData, setTrendingNowData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const getTrendingMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = "https://apis.ccbp.in/movies-app/trending-movies";
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (!response.ok || !data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const updatedTrendingData = data.results.map((eachMovie) => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        backdropPath:eachMovie.backdrop_path,
        title: eachMovie.title
      }));

      setTrendingNowData(updatedTrendingData);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const renderLoadingView = () => (
    <div className="bg-[rgb(19,19,19)] h-full flex justify-center items-center px-8">
      <div className="w-full max-w-6xl h-[213px] md:h-[466px] 
                        rounded-[4px] bg-[#0D0D0D]
                        flex flex-col justify-center items-center gap-4">
      <BeatLoader color="#ef4444" />
    </div>

    </div>
  );

  const renderFailureView = () => (
    <div className="bg-[rgb(19,19,19)] h-full flex justify-center items-center px-8">
      <div className="w-full max-w-6xl h-[200px] md:h-[300px] 
                        rounded-[4px] bg-[#0D0D0D]
                        flex flex-col justify-center items-center gap-4">
      <img src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
      />
      <h1 className="text-white text-xs md:text-lg">Something went wrong. Please try again</h1>
      <button
        onClick={getTrendingMovies}
        className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
      >
        Try Again
      </button>
    </div>

    </div>

  );


  const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "start",
  dragFree: true,
});

const scrollPrev = () => {
  if (emblaApi) emblaApi.scrollPrev();
};

const scrollNext = () => {
  if (emblaApi) emblaApi.scrollNext();
};

  
const renderSuccessView = () => {
  return (
    <div className="px-[32px] md:px-[164px] relative">

      {/* LEFT ARROW */}
      <button
        onClick={scrollPrev}
        className="
          hidden md:flex
          absolute left-[110px] top-1/2 -translate-y-1/2 z-10
          bg-black/60 text-white text-2xl
          h-10 w-10 rounded-full
          items-center justify-center
        "
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollNext}
        className="
          hidden md:flex
          absolute right-[110px] top-1/2 -translate-y-1/2 z-10
          bg-black/60 text-white text-2xl
          h-10 w-10 rounded-full
          items-center justify-center
        "
      >
        ❯
      </button>

      {/* embla__viewport */}
      <div className="overflow-hidden" ref={emblaRef}>

        {/* embla__container */}
        <div className="flex gap-4 md:gap-6">

          {trendingNowData.map(eachMovie => (
            
            <Link
              key={eachMovie.id}
              to={`/movies/${eachMovie.id}`}
              className="
                flex-none
                w-[45%]
                md:w-[254px]
              "
            >

              {/* embla__slide */}
              <img
                className="
                  w-full h-[80px]
                  md:h-[170px]
                  rounded-[8px]
                  object-cover
                "
                src={eachMovie.backdropPath}
                alt={eachMovie.title}
              />

            </Link>

          ))}

        </div>
      </div>

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
    <div className="bg-[#131313] h-screen py-6">
      <h1 className="md:text-[25px] text-[16px] font-semibold py-[20px]  px-[32px] xl:px-[164px] lg:px-[40px]  md:px-[25px] text-white">
        Trending Now
      </h1>
      {renderView()}
    </div>
  );
};

export default Trending;
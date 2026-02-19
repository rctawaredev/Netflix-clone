import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Trending = () => {
  const [data, setData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const getMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = "https://apis.ccbp.in/movies-app/trending-movies";
      const jwtToken = Cookies.get("jwt_token");

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const json = await res.json();

      if (!res.ok || !json.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      setData(json.results);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const renderLoading = () => (
  <div className="flex justify-center px-6 md:px-[164px]">
    
    <div className="
      flex f
      gap-5
      justify-center
      items-center
      py-15
      bg-[#0D0D0D]
      w-full
      max-w-6xl
      rounded-lg
    ">
         <BeatLoader color="#ef4444" />
    </div>
  </div>
);
  

  const renderFailure = () => (
  <div className="flex justify-center px-6 md:px-[164px]">
    
    <div className="
      flex flex-col
      gap-5
      justify-center
      items-center
      py-10
      bg-[#0D0D0D]
      w-full
      max-w-6xl
      rounded-lg
    ">

      <img
        src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
        alt="failure"
      />

      <h1 className="text-white text-xs md:text-lg">
        Something went wrong. Please try again
      </h1>

      <button
        onClick={getMovies}
        className="bg-white text-black text-xs md:text-sm px-4 py-2 rounded-md"
      >
        Try Again
      </button>

    </div>

  </div>
);
  
  

  const renderSuccess = () => (
    <div className="relative px-[24px] md:px-[164px]">
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-[110px] top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
      >
        ❮
      </button>

      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-[110px] top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white text-2xl h-10 w-10 rounded-full items-center justify-center"
      >
        ❯
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {data.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex-none w-[45%] md:w-[254px]"
            >
              <div
                className="
                  w-full
                  h-[80px] md:h-[170px]
                  rounded-[8px]
                  overflow-hidden"
              >
                <img
                  src={movie.backdrop_path}
                  alt={movie.title}
                  className="w-full h-[80px] md:h-[170px] rounded-[8px] object-cover hover:scale-103 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoading();
      case apiStatusConstants.FAILURE:
        return renderFailure();
      case apiStatusConstants.SUCCESS:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#131313] py-6">
      <h1 className="text-[16px] md:text-[24px] font-semibold text-white px-[24px] md:px-[164px] mb-4">
        Trending Now
      </h1>
      {renderView()}
    </div>
  );
};

export default Trending;

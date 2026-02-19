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

const Originals = () => {
  const [originalsData, setOriginalsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  // 🎬 ORIGINALS API CALL
  const getOriginalsMovies = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = "https://apis.ccbp.in/movies-app/originals";
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (!response.ok || !data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const updatedData = data.results.map((movie) => ({
        id: movie.id,
        backdropPath: movie.backdrop_path,
        title: movie.title,
      }));

      setOriginalsData(updatedData);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getOriginalsMovies();
  }, []);

  // 🔴 LOADING VIEW
  const renderLoadingView = () => (
    <div className="flex justify-center items-center py-20">
      <BeatLoader color="#ef4444" />
    </div>
  );

  // ❌ FAILURE VIEW
  const renderFailureView = () => (
    <div className="flex justify-center items-center py-10">
      <button
        onClick={getOriginalsMovies}
        className="bg-white text-black px-4 py-2 rounded-md"
      >
        Try Again
      </button>
    </div>
  );

  // ✅ SUCCESS VIEW
  const renderSuccessView = () => (
    <div className="relative px-[24px] md:px-[164px]">

      {/* LEFT ARROW */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-[110px] top-1/2 -translate-y-1/2 z-10
                   bg-black/60 text-white text-2xl h-10 w-10 rounded-full
                   items-center justify-center"
      >
        ❮
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-[110px] top-1/2 -translate-y-1/2 z-10
                   bg-black/60 text-white text-2xl h-10 w-10 rounded-full
                   items-center justify-center"
      >
        ❯
      </button>

      {/* EMBLA VIEWPORT */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">

          {originalsData.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex-none w-[45%] md:w-[254px]"
            >
              <img
                src={movie.backdropPath}
                alt={movie.title}
                className="
                  w-full
                  h-[140px]
                  md:h-[296px]
                  rounded-[8px]
                  object-cover
                "
              />
            </Link>
          ))}

        </div>
      </div>
    </div>
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

  return (
    <div className="bg-[#131313] py-6">
      <h1 className="
        text-[16px] md:text-[24px]
        font-semibold text-white
        px-[24px] md:px-[164px]
        mb-4
      ">
        Originals
      </h1>

      {renderView()}
    </div>
  );
};

export default Originals;
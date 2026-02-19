import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";
import Trending from "./Trending";
import Originals from "./Originals";

const apiStatusConstants = {
  INITIAL: "INITIAL",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const Home = () => {
  const [posterData, setPosterData] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL);

  const getPoster = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS);

    try {
      const url = "https://apis.ccbp.in/movies-app/top-rated-movies";
      const jwtToken = Cookies.get("jwt_token");

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      // API might not return results
      if (!response.ok || !data.results) {
        setApiStatus(apiStatusConstants.FAILURE);
        return;
      }

      const PosterDetails =
        data.results[Math.floor(data.results.length * Math.random())];

      const updatedPosterData = {
        id: PosterDetails.id,
        backdropPath: PosterDetails.backdrop_path,
        overview: PosterDetails.overview,
        posterPath: PosterDetails.poster_path,
        title: PosterDetails.title,
      };

      setPosterData(updatedPosterData);
      setApiStatus(apiStatusConstants.SUCCESS);
    } catch (error) {
      setApiStatus(apiStatusConstants.FAILURE);
    }
  };

  useEffect(() => {
    getPoster();
  }, []);

  const renderFailureView = () => {
    return (
      <>
        <Navbar className="bg-[#131313]" />

        <div className="bg-[#131313] min-h-screen pt-[75px] md:pt-[103px] flex justify-center items-center px-8">
          <div
            className="w-full max-w-6xl h-[213px] md:h-[466px] 
                        rounded-[4px] bg-[#0D0D0D]
                        flex flex-col justify-center items-center gap-4"
          >
            <img
              src="https://res.cloudinary.com/distnojxb/image/upload/v1771499484/alert-triangle_y1ebev.png"
              className="h-[24px] w-[24px]"
            />

            <p className="text-white text-sm">
              Something went wrong. Please try again
            </p>

            <button
              onClick={getPoster}
              className="rounded-md bg-white w-[77px] h-[28px]
                       font-semibold text-[12px] text-black"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderLoadingView = () => {
    return (
      <>
        <Navbar className="bg-[#131313]" />
        <div className="bg-[#131313] min-h-screen pt-[75px] md:pt-[103px]">
          <div className="flex justify-center items-center px-8">
            <div
              className="w-full max-w-6xl h-[213px] md:h-[466px] 
                        rounded-[4px] bg-[#0D0D0D]
                        flex justify-center items-center"
            >
              <BeatLoader color="#ef4444" />
            </div>
          </div>
        </div>
      </>
    );
  };
const renderSuccessView = () => {
  return (
    <div>
      <div
        className="
        w-full
        h-[80vh] md:h-[90vh]
        flex flex-col
        justify-center md:justify-end
        bg-no-repeat bg-cover bg-center
        px-[24px] md:px-[164px]
        pb-0 md:pb-[60px] lg:pb-[80px] 
        "
        style={{
          background: `
          linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.5) 40%,
            #181818 95%
          ),
          url(${posterData.backdropPath})
          `,
        }}
      >

        <Navbar className="bg-black/20 fixed top-0 left-0 right-0 backdrop-blur-xs"  />

        <div className="max-w-[90%] md:max-w-[600px]">

          <h1 className="
          text-white
          text-[28px] md:text-[48px]
          font-bold
          leading-tight
          mb-3
          ">
            {posterData.title}
          </h1>

          <p className="
          text-white
          text-[14px] md:text-[16px]
          mb-4
          ">
            {posterData.overview}
          </p>

          <button className="
          bg-white text-black
          rounded-md
          h-9 px-6
          ">
            Play
          </button>

        </div>
      </div>

      <Trending />
      <Originals/>
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

  return <div className="bg-[#131313]">{renderView()}</div>;
};

export default Home;

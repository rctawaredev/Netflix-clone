import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";


const Home = () => {
  const [posterData, setPosterData] = useState({});

  const getPoster = async () => {
    const url = "https://apis.ccbp.in/movies-app/top-rated-movies";
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const PosterDetails =
      data.results[Math.floor(data.results.length * Math.random())];
    console.log(PosterDetails);

    const updatedPosterData = {
      id: PosterDetails.id,
      backdropPath: PosterDetails.backdrop_path,
      overview: PosterDetails.overview,
      posterPath: PosterDetails.poster_path,
      title: PosterDetails.title,
    };

    setPosterData(updatedPosterData);
  };

  useEffect(() => {
    getPoster();
  }, []);

  return (
    <div
      className="w-full bg-cover bg-center h-[447px] md:h-[605px] "
             style={{
          backgroundImage: `url(${posterData.backdropPath})`,
        }}
    >
      <Navbar />
      <div
        className=" flex flex-col items-end h-[300px] md:pt-[199px] md:px-[164px] px-[32px] pt-[183px]"
      >
        <div>
          <h1 className="text-white text-[48px] font-bold leading-[62px] tracking-normal">{posterData.title}</h1>
          <p className="text-white  text-[16px] pb-3 md:w-[70%] lg:w-[45%] leading-[100%] tracking-normal">{posterData.overview}</p>
          <button className="bg-white rounded-md h-9 px-6">Play</button>
        </div>
      </div>
      
    
    </div>
  );
};

export default Home;

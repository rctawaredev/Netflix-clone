import Navbar from "./Navbar"
import { FaInstagram, FaGoogle } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

const Account=()=> {

    const renderAccount=()=> {
        return(
            <>
            <div className="h-[60vh] bg-white flex flex-col items-start px-10 lg:px-[164px] md:px-[100px]  pt-[40px]">
                <h1 className="text-[#131313] md:text-3xl text-2xl font-[500] tracking-normal leading-[100%] pb-4">Account</h1>
                <ul className="flex gap-4 border-y-[#CBD5E1] border-y-2 py-6 w-full">
                    <li>
                        <h1 className="md:text-xl text-lg text-[#94A3B8]">Membership</h1>
                    </li>
                    <li>
                        <p className="text-[#1E293B] md:text-lg text-md">
                            rohantaware.work@gmail.com
                        </p>
                        <p className="text-[#64748B] md:text-lg text-md"> ****************** </p>
                    </li>
                </ul>
                <ul className="flex items-start gap-7 border-b-[#CBD5E1] border-b-2 py-6 w-full">
                    <li>
                        <h1 className="md:text-xl text-lg text-[#94A3B8]">Plan details</h1>
                    </li>
                    <li className="flex gap-6">
                        <p className="text-[#1E293B] md:text-lg text-md">
                            Premium 
                        </p>
                        <p className="text-[#64748B] border border-[#1E293B] p-[0.5] px-1 rounded-sm text-[#1E293B] md:text-lg text-md font-medium"> Ultra HD </p>
                    </li>
                </ul>

            </div>
            </>

        )
    }

   const renderFooter = () => {
      return (
        <div className="flex justify-center py-10">
          <ul className="flex flex-col items-center gap-3">
            <li className="flex md:gap-8 gap-6">
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

    return (
        <div className="bg-[#181818] min-h-screen">
            <Navbar className="bg-[#131313]"/>
            {renderAccount()}
            {renderFooter()}
        </div>
    )
}

export default Account 


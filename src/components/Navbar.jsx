import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Navbar = ({className = "" }) => {
  const [clickedHamb, setClickedHamb] = useState(false);

  return (
    <nav className={` w-full  ${className}`}>
  
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center 
                  text-white h-[75px] md:h-[103px]">

    {/* LEFT */}
    <ul className="flex items-center gap-5">
      <li>
        <img
          src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
          className="md:h-10 h-7"
        />
      </li>

      <li className="hidden text-lg md:block hover:bg-red-500 hover:text-white hover:p-1 hover:px-2 hover:rounded-md transition-all duration-300 cursor-pointer">
        Home
      </li>

      <li className="hidden text-lg md:block hover:bg-red-500 hover:p-1 hover:px-2 hover:rounded-md transition-all duration-300 cursor-pointer">
        Popular
      </li>
    </ul>

    {/* RIGHT */}
    <ul className="flex items-center gap-7">
      <li>
        <div className="border flex justify-between items-center h-8 md:w-60 w-40 rounded-md">
          <input
            type="search"
            className="h-8 w-full outline-none bg-transparent px-2"
          />
          <FaSearch className="bg-[#262626] text-white rounded-r-md h-8 px-4 text-5xl" />
        </div>
      </li>

      <li>
        <img
          src="https://res.cloudinary.com/distnojxb/image/upload/v1771359519/Mask_Group_lz65bf.png"
          className="h-10 md:block hidden border rounded-3xl border-transparent hover:border-white transition duration-300"
        />

        {clickedHamb ? (
          <RxCross2
            className="md:hidden text-white text-xl"
            onClick={() => setClickedHamb(prev => !prev)}
          />
        ) : (
          <GiHamburgerMenu
            className="md:hidden text-white text-xl"
            onClick={() => setClickedHamb(prev => !prev)}
          />
        )}
      </li>
    </ul>

  </div>

  {/* Animated Mobile Menu */}
      <ul
        className={`md:hidden flex flex-col items-center  gap-4 
                   transition-all duration-200 ease-in-out
                    ${clickedHamb ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}
                    bg-black/80`}
      >
        <li className="text-white">Home</li>
        <li className="text-white">Popular</li>
        <li className="text-white">Account</li>
      </ul>
</nav>
  );
};

export default Navbar;
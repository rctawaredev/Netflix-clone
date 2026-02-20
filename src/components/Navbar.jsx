import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ className = "", searchText, setSearchText, onSearch }) => {
  const [clickedHamb, setClickedHamb] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <nav className={`w-full px-10 lg:px-[164px] md:px-[100px] ${className}`}>
      <div className="max-w-7xl flex justify-between items-center text-white h-[75px] md:h-[103px]">
        {/* LEFT */}
        <ul className="flex items-center gap-5">
          <li>
            <img
              src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
              className="md:h-10 h-7"
            />
          </li>

          <li>
            <Link to="/" className="hidden md:block text-lg">
              Home
            </Link>
          </li>

          <li>
            <Link to="/popular" className="hidden md:block text-lg">
              Popular
            </Link>
          </li>
        </ul>

        {/* RIGHT */}
        <ul className="flex items-center gap-4">
          {/* 🔍 ICON (HIDDEN on Search Page) */}
          {!isSearchPage && (
            <li onClick={() => navigate("/search")}>
              <FaSearch className="text-white text-xl cursor-pointer" />
            </li>
          )}

          {/* 🔍 INPUT (VISIBLE on Search Page) */}
          {isSearchPage && (
            <li>
              <div className="border-[1px] border-[#F8FAFC] flex justify-between items-center h-8 md:w-60 w-40 rounded-md">
                <input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="h-8 w-full outline-none bg-transparent px-2"
                />
                <FaSearch
                  className="bg-[#383737] text-white border-[1px] border-[#F8FAFC] rounded-r-md h-8 px-4 text-5xl"
                  onClick={onSearch}
                />
              </div>
            </li>
          )}

          <li>
            <img
              src="https://res.cloudinary.com/distnojxb/image/upload/v1771359519/Mask_Group_lz65bf.png"
              className="h-10 md:block hidden"
            />

            {clickedHamb ? (
              <RxCross2
                className="md:hidden text-white text-xl"
                onClick={() => setClickedHamb((prev) => !prev)}
              />
            ) : (
              <GiHamburgerMenu
                className="md:hidden text-white text-xl"
                onClick={() => setClickedHamb((prev) => !prev)}
              />
            )}
          </li>
        </ul>
      </div>

      <ul
        className={`md:hidden flex flex-col items-center  gap-4 
                   transition-all duration-200 ease-in-out
                    ${clickedHamb ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}
                    bg-black/80`}
      >
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/popular" className="text-white">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/account" className="text-white">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

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
    if (e.key === "Enter" && searchText.trim() !== "") {
      onSearch();
    }
  };

  return (
    <nav className={`w-full px-10 lg:px-[164px] md:px-[100px] ${className}`}>
      <div className="max-w-7xl flex justify-between items-center text-white h-[75px] md:h-[103px]">
        <ul className="flex items-center gap-5">
          <li>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1771334227/Group_7399_1_f1gwrg.png"
                alt="website logo"
                className="md:h-10 h-7"
              />
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="hidden md:block text-lg hover:underline hover:decoration-red-500"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/popular"
              className="hidden md:block text-lg hover:underline hover:decoration-red-500"
            >
              Popular
            </Link>
          </li>
        </ul>

        <ul className="flex items-center gap-4">
          {!isSearchPage && (
            <li>
              <button
                data-testid="searchButton"
                onClick={() => navigate("/search")}
                className="hover:scale-110 pt-2 transition duration-200"
              >
                <FaSearch className="text-white text-xl" />
              </button>
            </li>
          )}

          {isSearchPage && (
            <li className="flex items-center">
              <div
                className="
                flex items-center
                border border-[#F8FAFC]
                rounded-md
                overflow-hidden
                md:w-[300px]
                w-[180px]
                h-[36px]
                focus-within:border-red-500
                transition duration-300
                "
              >
                <input
                  type="search"
                  role="searchbox"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search"
                  className="
                  w-full
                  h-full
                  bg-transparent
                  px-3
                  outline-none
                  text-sm
                  placeholder:text-gray-400
                  "
                />

                <button
                  data-testid="searchButton"
                  onClick={() => {
                    if (searchText.trim() !== "") {
                      onSearch();
                    }
                  }}
                  className="
                  h-full
                  px-3
                  bg-[#2c2b2b]
                  flex items-center justify-center
                  hover:bg-red-500
                  transition duration-200
                  "
                >
                  <FaSearch className="text-white text-sm" />
                </button>
              </div>
            </li>
          )}

          <li>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/distnojxb/image/upload/v1771359519/Mask_Group_lz65bf.png"
                alt="profile"
                className="h-10 md:block hidden hover:scale-110 transition duration-200"
              />
            </Link>

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
        className={`md:hidden flex flex-col items-center gap-4 
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

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import Loader from "../shared/Loader";
import VideoLength from "../shared/VideoLength";
import { Context } from "../context/ContextApi";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // state to handle the state of searchbar
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const navigate = useNavigate();

  // fucntion to handle the searhbar queries
  const searchQueryHandler = (event) => {
    // ?: optional chaining saves app from crashing, if event is undefined and searchQuery is undefined
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`); // navigating to searchResult component based ont the query we passed in
    }
  };

  // in mobile screens to toggle the menu
  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation(); //This hook returns the current location object, his can be useful if you'd like to perform some side effect whenever the current location changes.
  // ?: optional chaining
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0]; //getting the name of the page we are in

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
      {/* if loading is true display loader component : Note* on refreshing the page you will see colourufl line bar at the top  */}
      {loading && <Loader />}

      {/* div to display the logo and hamburger menu */}
      <div className="flex h-5 items-center ">
        {
          // if we are not on VideoDetails component then display the following otherwise hide , *note: VideoDetails is in the directory video using routes
          //also hamburger menu
          pageName !== "video" && (
            <div
              className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="text-white text-xl" />
              ) : (
                <SlMenu className="text-white text-xl" />
              )}
            </div>
          )
        }

        <Link to="/" className="flex h-5 items-center">
          {/* logo image when screen is md and bigger */}
          <img
            src={ytLogo}
            alt="Youtube Logo"
            className="h-full hidden dark:md:block"
          />
          {/* logo image when screen is less than md */}
          <img
            src={ytLogoMobile}
            alt="Youtube Logo"
            className="h-full md:hidden"
          />
        </Link>
      </div>

        {/* search bar */}
      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}//updating value for our queries
            onKeyUp={searchQueryHandler}//caliing the method navigating to the desired page
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}//passing the vlaue to the searchQueryHandler function to know that it has clicked the search button
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-white text-xl cursor-pointer" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
            <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" alt="" />
          </div>
      </div>

    </div>
  );
};

export default Header;

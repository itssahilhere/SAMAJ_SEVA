import React from "react";
import { Link, useLocation } from "react-router-dom";
// import type { Region } from "../types";

// interface HeaderProps {
//   regions: Region[];
//   selectedRegion: string;
//   onRegionChange: (regionCode: string) => void;
// }

import {
  FaLocationDot,
  FaRegNewspaper,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

const newsItems = [
  {
    id: 1,
    news: "Government announces new education policy!",
  },
  {
    id: 2,
    news: "Heavy rain expected in coastal areas.",
  },
  {
    id: 3,
    news: "India wins the T20 World Cup 2025!",
  },
  {
    id: 4,
    news: "New AI model sets record-breaking accuracy!",
  },
  {
    id: 5,
    news: "Stock markets hit all-time high today.",
  },
];

const headerRouteData = [
  { id: 1, name: "Home", value: "home" },
  { id: 2, name: "Delhi", value: "delhi" },
  { id: 3, name: "Punjab", value: "punjab" },
  { id: 4, name: "Chandigarh", value: "chandigarh" },
  { id: 5, name: "Uttar Pradesh", value: "uttar-pradesh" },
  { id: 6, name: "Himachal", value: "himachal" },
  { id: 7, name: "Haryana", value: "haryana" },
  { id: 8, name: "Madhya Pradesh", value: "madhya-pradesh" },
  { id: 9, name: "Jammu and Kashmir", value: "jammu-and-kashmir" },
  { id: 10, name: "Bihar", value: "bihar" },
  { id: 11, name: "Jharkand", value: "jharkand" },
];

const Header = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const date = new Date();

  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  // Helper function to get active link classes
  const getActiveClasses = (path: string) => {
    const baseClasses =
      "transition-colors duration-200 px-3 py-2 rounded-lg font-medium";
    const activeClasses = "bg-yellow-400 text-red-800 shadow-md";
    const inactiveClasses = "hover:text-yellow-300 hover:bg-red-500";

    return isActive(path)
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <>
      <header className="hidden lg:block px-4 py-1 lg:px-30">
        {/* Top Bar */}
        <div className="relative border-b border-dashed py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaLocationDot className="h-4 w-4" />
              <p>Select State</p>
            </div>
            <div className="relative flex items-center">
              <IoNotifications className="h-5 w-5 text-gray-800" />

              {/* Badge */}
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                30
              </span>
            </div>
          </div>
          <div>
            <h1 className="absolute top-2.5 left-1/2 -translate-x-1/2 font-bold text-3xl">
              SAMAJ SEWAK
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaRegNewspaper className="h-5 w-5" />
              <p>E-paper</p>
            </div>
            <div className="flex items-center gap-2 border-l border-r px-4">
              <MdOutlineLiveTv className="h-5 w-5" />
              <p>Samaj TV</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-1 rounded-sm">
                <FaYoutube className="text-white h-4 w-4" />
              </div>
              <div className="bg-violet-700 p-1 rounded-sm">
                <FaInstagram className="text-white h-4 w-4" />
              </div>
              <div className="bg-black p-1 rounded-sm">
                <FaXTwitter className="text-white h-4 w-4" />
              </div>
              <div className="bg-blue-500 p-1 rounded-sm">
                <FaFacebookF className="text-white h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 my-4">
          <div className="flex flex-col">
            <p className="font-bold text-xs">{dayName}</p>
            <p className="text-xs">{monthName}</p>
            <p className="text-xs">
              {day}, {year}
            </p>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <nav className="flex gap-6 whitespace-nowrap px-4">
              {headerRouteData.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.value}`}
                  className="text-gray-700 hover:text-red-600 font-medium flex-shrink-0"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-6">
          <div className="bg-red-600 flex items-center gap-1 px-5 flex-shrink-0">
            <GoDotFill className="text-white font-bold" />
            <p className="font-bold text-white">Breaking</p>
          </div>

          <div className="overflow-hidden relative flex-1 bg-black">
            <ul className="flex animate-scroll">
              {[...newsItems, ...newsItems].map((newsItem, index) => (
                <li
                  key={index}
                  className="mx-8 inline-flex items-center text-white"
                >
                  <GoDotFill className="text-white mr-1 flex-shrink-0 h-3 w-3" />
                  {newsItem.news}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <nav className="">
          <div className="container mx-auto">
            <div className="flex items-center space-x-8 py-3">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <Link to="/" className={getActiveClasses("/")}>
                  🏠 Home
                </Link>
                <Link to="/top-news" className={getActiveClasses("/top-news")}>
                  🔥 Top News
                </Link>
                <Link to="/politics" className={getActiveClasses("/politics")}>
                  🏛️ Politics
                </Link>
                <Link to="/sports" className={getActiveClasses("/sports")}>
                  ⚽ Sports
                </Link>
                <Link
                  to="/entertainment"
                  className={getActiveClasses("/entertainment")}
                >
                  🎬 Entertainment
                </Link>
                <Link to="/business" className={getActiveClasses("/business")}>
                  💼 Business
                </Link>
                <Link
                  to="/technology"
                  className={getActiveClasses("/technology")}
                >
                  💻 Technology
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Small screen devices */}
      <header className="block lg:hidden lg:px-30">
        <div className="bg-red-600 flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <GiHamburgerMenu
              className="text-white h-6 w-6"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="font-bold text-white text-xl">SAMAJ SEWAK</h1>
          </div>
          <div className="flex items-center gap-2">
            <IoIosNotificationsOutline className="text-white h-8 w-8" />
            <IoNewspaperOutline className="text-white h-7 w-7" />
            <MdOutlineLiveTv className="text-white h-7 w-7" />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 p-4 bg-gray-700 shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end items-center pb-2">
            <FaXmark
              className="h-6 w-6 cursor-pointer text-white"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          {/* Scrollable nav */}
          <nav className="flex-1 overflow-y-auto mt-4 no-scrollbar">
            {headerRouteData.map((item) => (
              <Link key={item.id} to={`/${item.value}`}>
                <div className="flex items-center justify-between py-3 border-b border-gray-300 first:border-t">
                  <span className="text-white font-medium">{item.name}</span>
                  <IoIosArrowForward className="text-white" />
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-4">
          <div className="bg-red-600 flex items-center gap-1 px-3 flex-shrink-0">
            <GoDotFill className="text-white font-bold" />
            <p className="font-bold text-white">Breaking</p>
          </div>

          <div className="overflow-hidden relative flex-1 bg-black">
            <ul className="flex animate-scroll">
              {[...newsItems, ...newsItems].map((newsItem, index) => (
                <li
                  key={index}
                  className="mx-8 inline-flex items-center text-white"
                >
                  <GoDotFill className="text-white mr-1 flex-shrink-0 h-3 w-3" />
                  {newsItem.news}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav>
          {/* Only apply horizontal scroll on mobile/medium */}
          <div className="overflow-x-auto whitespace-nowrap flex gap-1 px-4 py-2 no-scrollbar">
            <Link to="/" className={`${getActiveClasses("/")} flex-shrink-0`}>
              🏠 Home
            </Link>
            <Link
              to="/top-news"
              className={`${getActiveClasses("/top-news")} flex-shrink-0`}
            >
              🔥 Top News
            </Link>
            <Link
              to="/politics"
              className={`${getActiveClasses("/politics")} flex-shrink-0`}
            >
              🏛️ Politics
            </Link>
            <Link
              to="/sports"
              className={`${getActiveClasses("/sports")} flex-shrink-0`}
            >
              ⚽ Sports
            </Link>
            <Link
              to="/entertainment"
              className={`${getActiveClasses("/entertainment")} flex-shrink-0`}
            >
              🎬 Entertainment
            </Link>
            <Link
              to="/business"
              className={`${getActiveClasses("/business")} flex-shrink-0`}
            >
              💼 Business
            </Link>
            <Link
              to="/technology"
              className={`${getActiveClasses("/technology")} flex-shrink-0`}
            >
              💻 Technology
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import type { Region } from "../types";
// import { GoDotFill } from "react-icons/go";

import { FaLocationDot } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
// import { MdOutlineLiveTv } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

interface HeaderProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (regionCode: string) => void;
  onSearch: (query: string) => void;
}

// const newsItems = [
//   {
//     id: 1,
//     news: "Government announces new education policy!",
//   },
//   {
//     id: 2,
//     news: "Heavy rain expected in coastal areas.",
//   },
//   {
//     id: 3,
//     news: "India wins the T20 World Cup 2025!",
//   },
//   {
//     id: 4,
//     news: "New AI model sets record-breaking accuracy!",
//   },
//   {
//     id: 5,
//     news: "Stock markets hit all-time high today.",
//   },
// ];

const Header: React.FC<HeaderProps> = ({
  regions,
  // selectedRegion,
  onRegionChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // When a region is chosen, navigate to its region route.
  const handleRegionClick = (code: string) => {
    onRegionChange(code); // Optional: update state for highlight
    navigate(`/region/${code}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Header search triggered with:", searchQuery);
    onSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch(""); // Trigger search with empty query to show all news
  };

  const handleSearchClick = () => {
    console.log("Search icon clicked with:", searchQuery);
    onSearch(searchQuery);
  };

  const date = new Date();

  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const monthSlice = monthName.slice(0, 3);

  return (
    <>
      <header className="hidden lg:block">
        {/* Top Bar */}
        <div className="relative py-4 flex justify-between items-center border-b border-dashed">
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
            <Link
              to="/"
              className="absolute top-4.5 left-1/2 -translate-x-1/2 font-bold text-3xl"
            >
              SAMAJ SEWAK
            </Link>
          </div>
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full px-4 py-2 pl-4 pr-20 text-gray-800 placeholder-gray-800 bg-transparent border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
              />

              {/* Clear button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-12 top-2.5 h-5 w-5 text-gray-800 hover:text-yellow-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-800 hover:text-yellow-300 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Region Navigation */}
        <nav className="hidden lg:flex py-2">
          <div className="flex flex-col">
            <p className="font-bold text-xs">{dayName}</p>
            <p className="text-xs">
              {monthSlice} {day}, {year}
            </p>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-0 mx-4">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => handleRegionClick(region.code)}
                  className={`px-3 py-2 cursor-pointer font-medium flex-shrink-0 transition-all duration-200
                  ${
                    location.pathname === `/region/${region.code}`
                      ? "text-red-500"
                      : "hover:text-red-500"
                  }
                `}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Breaking news scrollbar  */}
        {/* <div className="flex items-center h-10 overflow-hidden whitespace-nowrap">
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
        </div> */}
      </header>

      {/* Small screen header */}
      <header className="block lg:hidden lg:px-30">
        <div className="bg-red-600 flex justify-between items-center p-4">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="font-bold text-white text-xl">
              SAMAJ SEWAK
            </Link>
            <GiHamburgerMenu
              className="text-white h-6 w-6"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
          {/* <div className="flex items-center gap-2">
            <IoIosNotificationsOutline className="text-white h-8 w-8" />
            <IoNewspaperOutline className="text-white h-7 w-7" />
            <MdOutlineLiveTv className="text-white h-7 w-7" />
          </div> */}
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 p-4 bg-gray-700 shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
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
          <nav className="flex flex-col h-full overflow-y-auto no-scrollbar">
            {regions.map((region) => (
              <div
                className="flex items-center border-b border-gray-600 py-1"
                key={region.code}
                onClick={() => handleRegionClick(region.code)}
              >
                <button
                  key={region.code}
                  className={`px-3 py-2 mr-auto cursor-pointer font-medium
                  ${
                    location.pathname === `/region/${region.code}`
                      ? "text-red-500"
                      : "hover:text-red-500 text-white"
                  }
                `}
                >
                  {region.name}
                </button>
                <IoIosArrowForward className="text-white" />
              </div>
            ))}
          </nav>
        </div>
        {/* <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-8">
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
        </div> */}
      </header>
    </>
  );
};

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   FaLocationDot,
//   FaRegNewspaper,
//   FaXTwitter,
//   FaFacebookF,
// } from "react-icons/fa6";
// import { IoNotifications } from "react-icons/io5";
// import { MdOutlineLiveTv } from "react-icons/md";
// import { FaYoutube, FaInstagram } from "react-icons/fa";
// import { GoDotFill } from "react-icons/go";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { IoIosArrowForward } from "react-icons/io";
// import { FaXmark } from "react-icons/fa6";

// const headerRouteData = [
//   { id: 1, name: "Home", value: "home" },
//   { id: 2, name: "Delhi", value: "delhi" },
//   { id: 3, name: "Punjab", value: "punjab" },
//   { id: 4, name: "Chandigarh", value: "chandigarh" },
//   { id: 5, name: "Uttar Pradesh", value: "uttar-pradesh" },
//   { id: 6, name: "Himachal", value: "himachal" },
//   { id: 7, name: "Haryana", value: "haryana" },
//   { id: 8, name: "Madhya Pradesh", value: "madhya-pradesh" },
//   { id: 9, name: "Jammu and Kashmir", value: "jammu-and-kashmir" },
//   { id: 10, name: "Bihar", value: "bihar" },
//   { id: 11, name: "Jharkand", value: "jharkand" },
// ];

// const newsItems = [
//   {
//     id: 1,
//     news: "Government announces new education policy!",
//   },
//   {
//     id: 2,
//     news: "Heavy rain expected in coastal areas.",
//   },
//   {
//     id: 3,
//     news: "India wins the T20 World Cup 2025!",
//   },
//   {
//     id: 4,
//     news: "New AI model sets record-breaking accuracy!",
//   },
//   {
//     id: 5,
//     news: "Stock markets hit all-time high today.",
//   },
// ];

// const Header = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const date = new Date();

//   const dayName = date.toLocaleString("en-US", { weekday: "long" });
//   const monthName = date.toLocaleString("en-US", { month: "long" });
//   const day = date.getDate().toString().padStart(2, "0");
//   const year = date.getFullYear();

//   return (
//     <>
//       {/* large screen header */}
//       <header className="bg-white hidden lg:block px-4 py-1 lg:px-30">
//         <div className="relative border-b border-dashed py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <FaLocationDot className="h-4 w-4" />
//               <p>Select State</p>
//             </div>
//             <div className="relative flex items-center">
//               <IoNotifications className="h-5 w-5 text-gray-800" />

//               {/* Badge */}
//               <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
//                 30
//               </span>
//             </div>
//           </div>
//           <div>
//             <h1 className="absolute top-2.5 left-1/2 -translate-x-1/2 font-bold text-3xl">
//               SAMAJ SEWAK
//             </h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <FaRegNewspaper className="h-5 w-5" />
//               <p>E-paper</p>
//             </div>
//             <div className="flex items-center gap-2 border-l border-r px-4">
//               <MdOutlineLiveTv className="h-5 w-5" />
//               <p>Samaj TV</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="bg-red-600 p-1 rounded-sm">
//                 <FaYoutube className="text-white h-4 w-4" />
//               </div>
//               <div className="bg-violet-700 p-1 rounded-sm">
//                 <FaInstagram className="text-white h-4 w-4" />
//               </div>
//               <div className="bg-black p-1 rounded-sm">
//                 <FaXTwitter className="text-white h-4 w-4" />
//               </div>
//               <div className="bg-blue-500 p-1 rounded-sm">
//                 <FaFacebookF className="text-white h-4 w-4" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-8 my-4">
//           <div className="flex flex-col">
//             <p className="font-bold text-xs">{dayName}</p>
//             <p className="text-xs">{monthName}</p>
//             <p className="text-xs">
//               {day}, {year}
//             </p>
//           </div>
//           <div className="overflow-x-auto no-scrollbar">
//             <nav className="flex gap-6 whitespace-nowrap px-4">
//               {headerRouteData.map((item) => (
//                 <Link
//                   key={item.id}
//                   to={/${item.value}}
//                   className="text-gray-700 hover:text-red-600 font-medium flex-shrink-0"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>
//         <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-6">
//           <div className="bg-red-600 flex items-center gap-1 px-5 flex-shrink-0">
//             <GoDotFill className="text-white font-bold" />
//             <p className="font-bold text-white">Breaking</p>
//           </div>

//           <div className="overflow-hidden relative flex-1 bg-black">
//             <ul className="flex animate-scroll">
//               {[...newsItems, ...newsItems].map((newsItem, index) => (
//                 <li
//                   key={index}
//                   className="mx-8 inline-flex items-center text-white"
//                 >
//                   <GoDotFill className="text-white mr-1 flex-shrink-0 h-3 w-3" />
//                   {newsItem.news}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* Small screen header */}
//       <header className="block lg:hidden lg:px-30">
//         <div className="bg-red-600 flex justify-between items-center p-4">
//           <div className="flex items-center gap-3">
//             <GiHamburgerMenu
//               className="text-white h-6 w-6"
//               onClick={() => setSidebarOpen(true)}
//             />
//             <h1 className="font-bold text-white text-xl">SAMAJ SEWAK</h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <IoIosNotificationsOutline className="text-white h-8 w-8" />
//             <IoNewspaperOutline className="text-white h-7 w-7" />
//             <MdOutlineLiveTv className="text-white h-7 w-7" />
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full w-64 p-4 bg-gray-700 shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           {/* Close button */}
//           <div className="flex justify-end items-center pb-2">
//             <FaXmark
//               className="h-6 w-6 cursor-pointer text-white"
//               onClick={() => setSidebarOpen(false)}
//             />
//           </div>

//           {/* Scrollable nav */}
//           <nav className="flex-1 overflow-y-auto mt-4 no-scrollbar">
//             {headerRouteData.map((item) => (
//               <Link key={item.id} to={/${item.value}}>
//                 <div className="flex items-center justify-between py-3 border-b border-gray-300 first:border-t">
//                   <span className="text-white font-medium">{item.name}</span>
//                   <IoIosArrowForward className="text-white" />
//                 </div>
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-8">
//           <div className="bg-red-600 flex items-center gap-1 px-3 flex-shrink-0">
//             <GoDotFill className="text-white font-bold" />
//             <p className="font-bold text-white">Breaking</p>
//           </div>

//           <div className="overflow-hidden relative flex-1 bg-black">
//             <ul className="flex animate-scroll">
//               {[...newsItems, ...newsItems].map((newsItem, index) => (
//                 <li
//                   key={index}
//                   className="mx-8 inline-flex items-center text-white"
//                 >
//                   <GoDotFill className="text-white mr-1 flex-shrink-0 h-3 w-3" />
//                   {newsItem.news}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

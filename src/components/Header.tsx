// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Search, Menu, MapPin, Bell, X } from "lucide-react";
// import type { Region } from "../types";

// interface HeaderProps {
//   regions: Region[];
//   selectedRegion: string;
//   onRegionChange: (regionCode: string) => void;
//   onSearch: (query: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({
//   regions,
//   selectedRegion,
//   onRegionChange,
//   onSearch,
// }) => {
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
//   const location = useLocation();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Header search triggered with:", searchQuery);
//     onSearch(searchQuery);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     onSearch(""); // Trigger search with empty query to show all news
//   };

//   const handleSearchClick = () => {
//     console.log("Search icon clicked with:", searchQuery);
//     onSearch(searchQuery);
//   };

//   // Helper function to check if a link is active
//   const isActive = (path: string) => {
//     if (path === "/") {
//       return location.pathname === "/" || location.pathname === "/home";
//     }
//     return location.pathname === path;
//   };

//   // Helper function to get active link classes
//   const getActiveClasses = (path: string) => {
//     const baseClasses =
//       "transition-colors duration-200 px-3 py-2 rounded-lg font-medium";
//     const activeClasses = "bg-yellow-400 text-red-800 shadow-md";
//     const inactiveClasses = "hover:text-yellow-300 hover:bg-red-500";

//     return isActive(path)
//       ? `${baseClasses} ${activeClasses}`
//       : `${baseClasses} ${inactiveClasses}`;
//   };

//   return (
//     <header className="bg-red-700 text-white shadow-lg">
//       {/* Top Bar */}
//       <div className="bg-red-800 py-2">
//         <div className="container mx-auto px-4 flex justify-between items-center text-sm">
//           <div className="flex items-center space-x-4">
//             <span>Tuesday, October 1, 2025</span>
//             <span>|</span>
//             <span>Today's News</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Bell className="h-4 w-4" />
//             <span>Breaking News</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-6">
//             <img
//               src="/logo.png"
//               alt="SAMAJ SEWAK Logo"
//               style={{
//                 height: "120px",
//                 width: "auto",
//                 maxWidth: "150px",
//                 maxHeight: "150px",
//               }}
//               className="object-contain"
//             />
//             <div className="flex flex-col">
//               <h1 className="text-4xl font-bold text-white">SAMAJ SEWAK</h1>
//               <span className="text-yellow-300 text-base">Regional News</span>
//             </div>
//           </Link>

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search news..."
//                 className="w-full px-4 py-2 pl-4 pr-20 text-white placeholder-gray-300 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
//               />

//               {/* Clear button */}
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={handleClearSearch}
//                   className="absolute right-12 top-2.5 h-5 w-5 text-white hover:text-yellow-300 transition-colors"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>
//               )}

//               {/* Search button */}
//               <button
//                 type="button"
//                 onClick={handleSearchClick}
//                 className="absolute right-3 top-2.5 h-5 w-5 text-white hover:text-yellow-300 transition-colors"
//               >
//                 <Search className="h-4 w-4" />
//               </button>
//             </div>
//           </form>

//           {/* Mobile Menu */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="bg-red-600 border-t border-red-500">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center space-x-8 py-3">
//             {/* Region Selector */}
//             <div className="flex items-center space-x-2">
//               <MapPin className="h-4 w-4" />
//               <select
//                 value={selectedRegion}
//                 onChange={(e) => onRegionChange(e.target.value)}
//                 className="bg-transparent border border-red-400 rounded px-3 py-1 text-sm focus:outline-none focus:border-yellow-300"
//               >
//                 {regions.map((region) => (
//                   <option
//                     key={region.id}
//                     value={region.code}
//                     className="text-gray-800"
//                   >
//                     {region.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center space-x-2 text-sm">
//               <Link to="/" className={getActiveClasses("/")}>
//                 🏠 Home
//               </Link>
//               <Link to="/top-news" className={getActiveClasses("/top-news")}>
//                 🔥 Top News
//               </Link>
//               <Link to="/politics" className={getActiveClasses("/politics")}>
//                 🏛️ Politics
//               </Link>
//               <Link to="/sports" className={getActiveClasses("/sports")}>
//                 ⚽ Sports
//               </Link>
//               <Link
//                 to="/entertainment"
//                 className={getActiveClasses("/entertainment")}
//               >
//                 🎬 Entertainment
//               </Link>
//               <Link to="/business" className={getActiveClasses("/business")}>
//                 💼 Business
//               </Link>
//               <Link
//                 to="/technology"
//                 className={getActiveClasses("/technology")}
//               >
//                 💻 Technology
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navigation Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-red-700 border-t border-red-500 mobile-menu-enter">
//           <div className="container mx-auto px-4 py-4">
//             <div className="space-y-3">
//               <Link
//                 to="/"
//                 className={`block ${getActiveClasses("/")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 🏠 Home
//               </Link>
//               <Link
//                 to="/top-news"
//                 className={`block ${getActiveClasses("/top-news")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 🔥 Top News
//               </Link>
//               <Link
//                 to="/politics"
//                 className={`block ${getActiveClasses("/politics")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 🏛️ Politics
//               </Link>
//               <Link
//                 to="/sports"
//                 className={`block ${getActiveClasses("/sports")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 ⚽ Sports
//               </Link>
//               <Link
//                 to="/entertainment"
//                 className={`block ${getActiveClasses("/entertainment")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 🎬 Entertainment
//               </Link>
//               <Link
//                 to="/business"
//                 className={`block ${getActiveClasses("/business")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 💼 Business
//               </Link>
//               <Link
//                 to="/technology"
//                 className={`block ${getActiveClasses("/technology")}`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 💻 Technology
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

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

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const date = new Date();

  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return (
    <>
      {/* large screen header */}
      <header className="bg-white hidden lg:block px-4 py-1 lg:px-30">
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
          <div>
            <nav className="no-scrollbar flex gap-6 overflow-x-auto whitespace-nowrap">
              {headerRouteData.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.value}`}
                  className="text-gray-700 hover:text-red-600 font-medium"
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
      </header>

      {/* Small screen header */}
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

        <div className="flex items-center h-10 overflow-hidden whitespace-nowrap mt-8">
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
      </header>
    </>
  );
};

export default Header;

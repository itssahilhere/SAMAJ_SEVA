import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, MapPin, Bell, X } from "lucide-react";
import type { Region } from "../types";

interface HeaderProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (regionCode: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

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
    <header className="bg-red-700 text-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-red-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>Tuesday, October 1, 2025</span>
            <span>|</span>
            <span>Today's News</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-4 w-4" />
            <span>Breaking News</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-6">
            <img
              src="/logo.png"
              alt="SAMAJ SEWAK Logo"
              style={{
                height: "120px",
                width: "auto",
                maxWidth: "150px",
                maxHeight: "150px",
              }}
              className="object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-white">SAMAJ SEWAK</h1>
              <span className="text-yellow-300 text-base">Regional News</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="w-full px-4 py-2 pl-4 pr-20 text-white placeholder-gray-300 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
              />

              {/* Clear button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-12 top-2.5 h-5 w-5 text-white hover:text-yellow-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Search button */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="absolute right-3 top-2.5 h-5 w-5 text-white hover:text-yellow-300 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-red-600 border-t border-red-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            {/* Region Selector */}
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className="bg-transparent border border-red-400 rounded px-3 py-1 text-sm focus:outline-none focus:border-yellow-300"
              >
                {regions.map((region) => (
                  <option
                    key={region.id}
                    value={region.code}
                    className="text-gray-800"
                  >
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-red-700 border-t border-red-500 mobile-menu-enter">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-3">
              <Link
                to="/"
                className={`block ${getActiveClasses("/")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                to="/top-news"
                className={`block ${getActiveClasses("/top-news")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🔥 Top News
              </Link>
              <Link
                to="/politics"
                className={`block ${getActiveClasses("/politics")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🏛️ Politics
              </Link>
              <Link
                to="/sports"
                className={`block ${getActiveClasses("/sports")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ⚽ Sports
              </Link>
              <Link
                to="/entertainment"
                className={`block ${getActiveClasses("/entertainment")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                🎬 Entertainment
              </Link>
              <Link
                to="/business"
                className={`block ${getActiveClasses("/business")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                💼 Business
              </Link>
              <Link
                to="/technology"
                className={`block ${getActiveClasses("/technology")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                💻 Technology
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

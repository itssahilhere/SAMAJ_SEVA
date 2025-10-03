import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import type { Region } from "../types";

interface LayoutProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (regionCode: string) => void;
  onSearch: (query: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
  onSearch,
  children,
}) => {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  // Helper function to get active link classes for footer
  const getFooterActiveClasses = (path: string) => {
    const baseClasses = "hover:text-white transition-colors duration-200";
    const activeClasses = "text-yellow-300 font-semibold";
    const inactiveClasses = "text-gray-300";

    return isActive(path)
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        regions={regions}
        selectedRegion={selectedRegion}
        onRegionChange={onRegionChange}
        onSearch={onSearch}
      />
      {children}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SAMAJ SEWAK</h3>
              <p className="text-gray-300 text-sm">
                Your trusted regional news source. We provide accurate and
                unbiased news coverage across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/politics"
                    className={getFooterActiveClasses("/politics")}
                  >
                    🏛️ Politics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sports"
                    className={getFooterActiveClasses("/sports")}
                  >
                    ⚽ Sports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/entertainment"
                    className={getFooterActiveClasses("/entertainment")}
                  >
                    🎬 Entertainment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business"
                    className={getFooterActiveClasses("/business")}
                  >
                    💼 Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Regions</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {regions.slice(0, 4).map((region) => (
                  <li key={region.id}>
                    <button
                      onClick={() => onRegionChange(region.code)}
                      className="hover:text-white text-left"
                    >
                      {region.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: contact@newshubindia.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: New Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-300">
            <p>&copy; 2025 SAMAJ SEWAK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Region } from "../types";

interface HeaderProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (regionCode: string) => void;
}

const Footer: React.FC<HeaderProps> = ({
  regions,
  //   selectedRegion,
  onRegionChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // When a region is chosen, navigate to its region route.
  const handleRegionClick = (code: string) => {
    onRegionChange(code); // Optional: update state for highlight
    navigate(`/region/${code}`);
  };

  return (
    <>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SAMAJ SEWAK</h3>
              <p className="text-gray-300 text-sm">
                Your trusted regional news source.
                <br /> We provide accurate and unbiased news coverage across
                India.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 items-start justify-start text-left">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => handleRegionClick(region.code)}
                  className={`px-0 md:px-4 py-1 cursor-pointer font-medium flex-shrink-0 transition-all duration-200 text-left
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

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: contact@newshubindia.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: New Delhi, India</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; 2025 SAMAJ SEWAK. All rights reserved.</p>
        </div>
      </footer>
      {/* Small screen header */}
    </>
  );
};

export default Footer;

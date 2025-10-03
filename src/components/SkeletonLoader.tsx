import React from "react";

interface SkeletonLoaderProps {
  type?: "card" | "list" | "text" | "image" | "button";
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "card",
  count = 1,
  className = "",
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Badge skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>

              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              </div>

              {/* Meta info skeleton */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
              </div>

              {/* Tags skeleton */}
              <div className="flex space-x-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-10 w-full bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="flex space-x-4 p-3 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        );

      case "text":
        return (
          <div className="space-y-2 animate-pulse">
            {Array.from({ length: count }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-200 rounded"
                style={{ width: `${Math.random() * 40 + 60}%` }}
              ></div>
            ))}
          </div>
        );

      case "image":
        return (
          <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl"></div>
        );

      case "button":
        return (
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={count > 1 ? "mb-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

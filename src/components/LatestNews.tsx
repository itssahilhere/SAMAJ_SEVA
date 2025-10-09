import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import type { NewsArticle } from "../types";
import SkeletonLoader from "./SkeletonLoader";
import LatestNewsCard from "./LatestNewsCard";

interface NewsGridProps {
  news: NewsArticle[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  autoScroll?: boolean;
  scrollInterval?: number;
}

const LatestNews: React.FC<NewsGridProps> = ({
  news,
  loading = false,
  error = null,
  onRefresh,
  onLoadMore,
  hasMore = true,
  loadingMore = false,
  autoScroll = true,
  scrollInterval = 3000,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(false);

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!autoScroll || scrolling) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        handleNext();
      }
    }, scrollInterval);
    return () => clearInterval(interval);
  }, [autoScroll, scrolling]);

  const stopAutoScroll = () => setScrolling(true);
  const startAutoScroll = () => setScrolling(false);
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Hero skeleton */}
        <div className="mb-8">
          <SkeletonLoader type="card" count={1} />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonLoader type="card" count={6} />
        </div>
      </div>
    );
  }

  // console.log(news);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">No news available</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="">
      {/* Grid Layout for remaining articles */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden group">
        {/* Header */}
        <div className="flex items-center mb-4 px-0 md:px-0">
          <h1 className="mr-auto font-bold text-xl">Latest News</h1>

          <button
            onClick={handlePrev}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="bg-black hover:bg-gray-800 transition cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNext}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="bg-black hover:bg-gray-800 ml-2 transition cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Horizontal Scrollable Container */}
        <div
          ref={sliderRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {news.map((article) => (
            <div
              key={article.id}
              className="flex-shrink-0 w-[100%] snap-center"
            >
              <LatestNewsCard article={article} size="large" />
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {news.length > 0 && hasMore && onLoadMore && (
        <div className="text-center pt-12">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading More News...</span>
              </>
            ) : (
              <>
                <span>Load More News</span>
                <span className="text-lg">📰</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* No More News Message */}
      {news.length > 0 && !hasMore && (
        <div className="text-center pt-8">
          <p className="text-gray-500">No more news to load</p>
        </div>
      )}
    </div>
  );
};

export default LatestNews;

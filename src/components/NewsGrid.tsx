import React from "react";
import { Loader2, RefreshCw } from "lucide-react";
import type { NewsArticle } from "../types";
import NewsCard from "./NewsCard";
import SkeletonLoader from "./SkeletonLoader";

interface NewsGridProps {
  news: NewsArticle[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  news,
  loading = false,
  error = null,
  onRefresh,
  onLoadMore,
  hasMore = true,
  loadingMore = false,
}) => {
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
    <div className="space-y-8">
      {/* Hero Article */}
      {news.length > 0 && (
        <div className="mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <NewsCard article={news[0]} size="large" />
        </div>
      )}

      {/* Grid Layout for remaining articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.slice(1).map((article, index) => (
          <div
            key={article.id}
            className="transform hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <NewsCard article={article} size="medium" />
          </div>
        ))}
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

export default NewsGrid;

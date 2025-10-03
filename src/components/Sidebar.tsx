import React, { useState } from "react";
import { TrendingUp, Star, Clock } from "lucide-react";
import type { NewsArticle } from "../types";
import {
  getPlaceholderImage,
  createImageErrorHandler,
} from "../utils/imageUtils";
import SkeletonLoader from "./SkeletonLoader";

interface SidebarProps {
  featuredNews: NewsArticle[];
  trendingNews: NewsArticle[];
  loading?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  featuredNews,
  trendingNews,
  loading = false,
}) => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <aside className="space-y-6">
        {/* Featured News Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-gray-200 p-2 rounded-full mr-3 w-9 h-9 animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <SkeletonLoader type="list" count={5} />
        </div>

        {/* Trending News Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-gray-200 p-2 rounded-full mr-3 w-9 h-9 animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <SkeletonLoader type="list" count={8} />
        </div>

        {/* Advertisement Skeleton */}
        <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
          <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-3 w-20 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6">
      {/* Featured News */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-full mr-3">
            <Star className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Featured News</h2>
        </div>
        <div className="space-y-4">
          {featuredNews.slice(0, 5).map((article, index) => (
            <div
              key={article.id}
              className="flex space-x-4 pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={
                  imageErrors[article.id] || !article.imageUrl
                    ? getPlaceholderImage(article.id, "sidebar")
                    : article.imageUrl
                }
                alt={article.title}
                className="w-16 h-16 rounded-xl object-cover bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                onError={createImageErrorHandler(article.id, setImageErrors)}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-red-600 cursor-pointer transition-colors group-hover:text-red-600">
                  {article.title}
                </h3>
                <div className="flex items-center mt-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full w-fit">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending News */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-2 rounded-full mr-3">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Trending</h2>
        </div>
        <div className="space-y-4">
          {trendingNews.slice(0, 8).map((article, index) => (
            <div
              key={article.id}
              className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200 group"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-red-600 cursor-pointer transition-colors group-hover:text-red-600">
                  {article.title}
                </h3>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    👁️ {article.views} views
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    📅 {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-300">
        <div className="text-4xl mb-3">📢</div>
        <p className="text-gray-600 font-medium">Advertisement Space</p>
        <p className="text-sm text-gray-500 mt-1">Your Ad Here</p>
      </div>
    </aside>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, ExternalLink } from "lucide-react";
import type { NewsArticle } from "../types";
import {
  getPlaceholderImage,
  createImageErrorHandler,
} from "../utils/imageUtils";

interface NewsCardProps {
  article: NewsArticle;
  size?: "small" | "medium" | "large";
  showImage?: boolean;
}

const LatestNewsCard: React.FC<NewsCardProps> = ({
  article,
  size = "medium",
  showImage = true,
}) => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageError = createImageErrorHandler(article.id, setImageErrors);

  const handleReadMore = () => {
    if (article.url) {
      // If article has external URL, open in new tab
      window.open(article.url, "_blank", "noopener,noreferrer");
    } else {
      // Navigate to internal article detail page
      navigate(`/article/${article.id}`);
    }
  };

  const handleCardClick = () => {
    handleReadMore();
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const cardClasses = {
    small:
      "bg-white  overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-red-200 group",
    medium:
      "bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-red-200 group",
    large:
      "bg-white  overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-red-200 group",
  };

  const imageClasses = {
    small:
      "w-full h-32 object-cover bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300",
    medium:
      "w-full h-48 object-cover bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300",
    large:
      "w-full h-64 object-cover bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300",
  };

  return (
    <article
      className={`${cardClasses[size]} cursor-pointer`}
      onClick={handleCardClick}
    >
      {showImage && (
        <div className="relative overflow-hidden">
          <img
            src={
              imageErrors[article.id] || !article.imageUrl
                ? getPlaceholderImage(article.id, "news")
                : article.imageUrl
            }
            alt={article.title}
            className={imageClasses[size]}
            onError={handleImageError}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {article.isBreaking && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              🔥 Breaking
            </span>
          )}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {article.category}
          </span>

          {/* Hover overlay with read more button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Read More →
            </span>
          </div>
        </div>
      )}

      <div className={`p-${size === "large" ? "4" : "2"}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-blue-600 font-medium bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 rounded-full border border-blue-200">
            📍 {article.region}
          </span>
          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <Eye className="h-3 w-3" />
            <span>{formatViews(article.views)}</span>
          </div>
        </div>

        <h2
          onClick={(e) => {
            e.stopPropagation();
            handleReadMore();
          }}
          className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 cursor-pointer transition-colors group-hover:text-red-600 ${
            size === "large"
              ? "text-xl leading-tight"
              : size === "medium"
              ? "text-lg leading-tight"
              : "text-sm leading-tight"
          }`}
        >
          {article.title}
        </h2>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <span className="bg-gray-50 px-2 py-1 rounded-full">
              ✍️ {article.author}
            </span>
            <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span>{article.readTime} min</span>
            </div>
          </div>
          <span className="bg-gray-50 px-2 py-1 rounded-full">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gradient-to-r from-red-50 to-pink-50 text-red-700 px-3 py-1 rounded-full border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReadMore();
          }}
          className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium transition-all duration-300 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full border border-red-200 hover:border-red-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600"
        >
          <span>Read Full Article</span>
          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </article>
  );
};

export default LatestNewsCard;

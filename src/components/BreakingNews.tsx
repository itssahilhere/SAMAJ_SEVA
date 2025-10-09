import React from "react";
import { AlertCircle } from "lucide-react";
import type { NewsArticle } from "../types";

interface BreakingNewsProps {
  breakingNews: NewsArticle[];
  loading?: boolean;
}

const BreakingNews: React.FC<BreakingNewsProps> = ({
  breakingNews,
  loading = false,
}) => {
  // Removed unused currentIndex state and related useEffect

  if (loading) {
    return (
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="flex items-center bg-red-700 px-3 py-1 rounded mr-4">
              <div className="h-4 w-4 bg-red-500 rounded mr-1 animate-pulse"></div>
              <div className="h-4 w-24 bg-red-500 rounded animate-pulse"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="h-4 w-full bg-red-500 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-1 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center bg-red-700 px-3 py-1 rounded mr-4">
            <AlertCircle className="h-4 w-4 mr-1 animate-pulse" />
            <span className="text-sm font-bold">Breaking News</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div
              className="animate-marquee whitespace-nowrap"
              style={{
                animation: "marquee 30s linear infinite",
              }}
            >
              {breakingNews.map((article, index) => (
                <span key={article.id} className="inline-block mr-8">
                  <span className="text-yellow-300 mr-2">•</span>
                  {article.title}
                  {index < breakingNews.length - 1 && (
                    <span className="mx-4 text-yellow-300">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;

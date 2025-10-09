import React from "react";
import { useNavigate } from "react-router-dom";
import type { NewsArticle } from "../types";

interface NewsCardProps {
  article: NewsArticle;
  size?: "small" | "medium" | "large";
}

const BusinessNewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/article/${article.id}`);
    }
  };

  return (
    <li onClick={handleReadMore}>
      <h2
        className="text-md md:text-lg text-gray-800 hover:text-red-600 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleReadMore();
        }}
      >
        {article.title}
      </h2>
    </li>
  );
};

export default BusinessNewsCard;

// src/pages/RegionNews.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { newsAPI } from "../services/api";
import type { NewsArticle } from "../types";
import LatestNews from "../components/LatestNews";
import TopNews from "../components/TopNews";
import SportsNews from "../components/SportsNews";
import PolictsNews from "../components/PoliticsNews";
import Entertainment from "../components/EntertainmentNews";
import BusinessNews from "../components/BusinessNews";
import TechnologyNews from "../components/TechnologyNews";

interface Category {
  key: string;
  label: string;
}

const CATEGORY_MAP: Category[] = [
  { key: "home", label: "Latest News" },
  { key: "top-news", label: "Top News" },
  { key: "politics", label: "Politics" },
  { key: "sports", label: "Sports" },
  { key: "entertainment", label: "Entertainment" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Technology" },
];

type SectionData = Record<string, NewsArticle[]>;

function RegionNews() {
  const { regionCode } = useParams<{ regionCode: string }>();
  const [sectionData, setSectionData] = useState<SectionData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regionCode) return;

    const getAdminNews = async () => {
      try {
        const response = await fetch(
          `https://samaj-seva-admin-panel-backend-2.onrender.com/api/news?region=${regionCode}`,
          { method: "GET" }
        );
        const adminNews = await response.json();
        console.log(adminNews);
        console.log(`Admin News for region ${regionCode}:`, adminNews);

        // Filter admin news matching the region
        const filteredAdminNews = adminNews
          .filter((item: NewsArticle) => item.region?.includes(regionCode))
          .map((item: NewsArticle) => ({
            author: item.author,
            title: item.title,
            summary: item.summary,
            content: item.content,
            url: item.url,
            tags: item.tags,
            id: item.id,
            imageUrl: item.imageUrl,
            publishedAt: item.publishedAt,
            isBreaking: item.isBreaking,
            views: item.views,
            readTime: item.readTime,
            category: Array.isArray(item.category)
              ? item.category[0]
              : item.category,
            region: Array.isArray(item.region) ? item.region[0] : item.region,
          }));

        // Prepare structure like sectionData (category-based)
        const adminSectionData: SectionData = {};
        CATEGORY_MAP.forEach((cat) => {
          adminSectionData[cat.key] = filteredAdminNews.filter(
            (item: NewsArticle) => item.category === cat.key
          );
        });

        return adminSectionData;
      } catch (err) {
        console.error("Error fetching admin news:", err);
        return {};
      }
    };

    setLoading(true);
    setError(null);

    const fetchAll = async () => {
      try {
        const [adminSectionData, ...results] = await Promise.all([
          getAdminNews(),
          ...CATEGORY_MAP.map((cat) =>
            newsAPI.getNewsByRegionAndCategory(regionCode, cat.key, 1, 10)
          ),
        ]);

        // Merge API + Admin results
        const data: SectionData = {};
        CATEGORY_MAP.forEach((cat, i) => {
          const apiNews = results[i].data || [];
          const adminNews = adminSectionData[cat.key] || [];
          data[cat.key] = [...adminNews, ...apiNews];
        });

        setSectionData(data);
        console.log("Section data:", data);
        setLoading(false);
        console.log("Merged section data:", data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load news for region.");
        setLoading(false);
      }
    };

    fetchAll();
  }, [regionCode]);

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-600">{error}</div>;

  return (
    <main className="container mx-auto px-4 md:px-0 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {regionCode?.replace(/-/g, " ")} News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-none md:border-b border-gray-400 md:border-dashed md:pb-8 mb-8">
        <div className="border-none md:border-r border-gray-400 md:border-dashed md:pr-4 md:lg:pr-8">
          <LatestNews news={sectionData["home"] || []} />
        </div>
        <TopNews news={sectionData["top-news"] || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-none md:border-b border-gray-400 md:border-dashed md:pb-8 mb-8">
        <div className="order-1 md:order-0 border-none md:border-r border-gray-400 md:border-dashed md:pr-4 md:lg:pr-8">
          <SportsNews news={sectionData["sports"] || []} />
        </div>
        <PolictsNews news={sectionData["politics"] || []} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-none md:border-b border-gray-400 md:border-dashed md:pb-8 mb-8">
        <div className="border-none md:border-r border-gray-400 md:border-dashed md:pr-4 md:lg:pr-8">
          <Entertainment news={sectionData["entertainment"] || []} />
        </div>
        <BusinessNews news={sectionData["business"] || []} />
        <div className="border-none lg:border-l border-gray-400 md:border-dashed md:pl-4 md:lg:pl-8">
          <TechnologyNews news={sectionData["technology"] || []} />
        </div>
      </div>

      {/* {CATEGORY_MAP.map((cat) =>
        sectionData[cat.key]?.length > 0 ? (
          <section className="mb-8" key={cat.key}>
            <h2 className="text-xl font-semibold mb-3">{cat.label}</h2>
            <NewsGrid news={sectionData[cat.key]} />
          </section>
        ) : null
      )} */}
    </main>
  );
}

export default RegionNews;

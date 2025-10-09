import axios from "axios";
import type { NewsArticle, Region, APIResponse } from "../types";
import { saveToCache, getFromCache, CACHE_DURATION } from "../utils/cacheUtils";

// NewsData.io API configuration
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
const NEWSDATA_BASE_URL = "https://newsdata.io/api/1";

// Pagination cache to track pagination for different queries
interface PaginationCache {
  [key: string]: number;
}
const paginationCache: PaginationCache = {};

// Helper function to convert NewsData.io article to our NewsArticle format
const convertNewsDataArticle = (
  article: Record<string, unknown>
): NewsArticle => {
  const getStringValue = (value: unknown, defaultValue: string): string => {
    return typeof value === "string" ? value : defaultValue;
  };

  const getArrayValue = (value: unknown, defaultValue: string[]): string[] => {
    return Array.isArray(value)
      ? value.filter((item) => typeof item === "string")
      : defaultValue;
  };

  const title = getStringValue(article.title, "No title available");
  const content = getStringValue(
    article.content,
    getStringValue(article.description, "No content available")
  );
  const description = getStringValue(article.description, "");
  const summary = description || title.substring(0, 150) + "...";
  const creator = getArrayValue(article.creator, []);
  const author = creator.length > 0 ? creator[0] : "Unknown";
  const publishedAt = getStringValue(article.pubDate, new Date().toISOString());
  const imageUrl = getStringValue(
    article.image_url,
    "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800"
  );
  const category = getArrayValue(article.category, []);
  const country = getArrayValue(article.country, []);
  const link = getStringValue(article.link, "");
  const keywords = getArrayValue(article.keywords, []);

  return {
    id: getStringValue(article.article_id, link), // Use article_id or link as unique ID
    title,
    content,
    summary,
    author,
    publishedAt,
    imageUrl,
    category: category.length > 0 ? category[0] : "General",
    region: country.length > 0 ? country[0] : "India",
    url: link,
    isBreaking: false,
    readTime: calculateReadTime(content),
    views: Math.floor(Math.random() * 2000) + 100,
    tags: keywords,
  };
};

// Helper function to calculate read time
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

// Helper function to check if error is an axios error
const isAxiosError = (
  error: unknown
): error is { response?: { status?: number; data?: { message?: string } } } => {
  return error !== null && typeof error === "object" && "response" in error;
};

// Predefined regions for NewsData.io
const regions: Region[] = [
  { id: "1", name: "All Regions", code: "all" },
  { id: "2", name: "India", code: "in" },
  { id: "3", name: "Delhi", code: "delhi" },
  { id: "4", name: "Punjab", code: "punjab" },
  { id: "5", name: "Chandigarh", code: "chandigarh" },
  { id: "6", name: "Uttar Pradesh", code: "uttar-pradesh" },
  { id: "7", name: "Himachal", code: "himachal" },
  { id: "8", name: "Haryana", code: "haryana" },
  { id: "9", name: "Madhya Pradesh", code: "madhya-pradesh" },
  { id: "10", name: "Jammu and Kashmir", code: "jammu-and-kashmir" },
  { id: "11", name: "Bihar", code: "bihar" },
  { id: "12", name: "Jharkand", code: "jharkand" },
];

export const newsAPI = {
  // Get all regions
  getRegions: async (): Promise<APIResponse<Region[]>> => {
    return {
      data: regions,
      message: "Regions fetched successfully",
      status: 200,
    };
  },

  // Get news by region with pagination
  getNewsByRegion: async (
    regionCode: string,
    page: number = 1,
    size: number = 10
  ): Promise<APIResponse<NewsArticle[]>> => {
    const cacheKey = `news-region-${regionCode}-page-${page}`;
    if (page === 1) {
      const cachedData = getFromCache<NewsArticle[]>(cacheKey);
      if (cachedData && cachedData.length > 0) {
        return {
          data: cachedData,
          message: "News loaded from cache",
          status: 200,
        };
      }
    }

    try {
      const regionQueriesMap: { [key: string]: string[] } = {
        all: [
          "India",
          "India news",
          "breaking India",
          "India today",
          "latest India",
          "India updates",
        ],
        in: [
          "India",
          "India news",
          "breaking India",
          "India today",
          "latest India",
          "India updates",
        ],
        delhi: ["Delhi", "Delhi news", "NCR", "New Delhi", "Gurgaon", "Noida"],
        punjab: [
          "Punjab",
          "Punjab news",
          "Amritsar",
          "Ludhiana",
          "Jalandhar",
          "Chandigarh",
        ],
        chandigarh: [
          "Chandigarh",
          "Punjab news",
          "Chandigarh news",
          "Sector 17",
          "Panchkula",
          "Mohali",
        ],
        "uttar-pradesh": [
          "Uttar Pradesh",
          "UP news",
          "Lucknow",
          "Kanpur",
          "Varanasi",
          "Agra",
        ],
        himachal: [
          "Himachal Pradesh",
          "Shimla",
          "Manali",
          "Dharamshala",
          "Kullu",
          "Solan",
        ],
        haryana: [
          "Haryana",
          "Haryana news",
          "Gurgaon",
          "Faridabad",
          "Panipat",
          "Karnal",
        ],
        "madhya-pradesh": [
          "Madhya Pradesh",
          "MP news",
          "Bhopal",
          "Indore",
          "Gwalior",
          "Jabalpur",
        ],
        "jammu-and-kashmir": [
          "Jammu and Kashmir",
          "Jammu",
          "Srinagar",
          "Kashmir news",
          "Ladakh",
          "Anantnag",
        ],
        bihar: [
          "Bihar",
          "Bihar news",
          "Patna",
          "Gaya",
          "Bhagalpur",
          "Muzaffarpur",
        ],
        jharkand: [
          "Jharkhand",
          "Jharkhand news",
          "Ranchi",
          "Jamshedpur",
          "Dhanbad",
          "Bokaro",
        ],
      };

      const paginationKey = `region-${regionCode}`;
      if (page === 1) {
        paginationCache[paginationKey] = 1;
      }

      const queryVariations = regionQueriesMap[regionCode] || ["India"];
      const query = queryVariations[(page - 1) % queryVariations.length];

      const params: Record<string, string | number> = {
        apikey: NEWSDATA_API_KEY,
        country: "in",
        language: "en",
        size: size > 10 ? 10 : size,
        q: query,
      };

      if (page > 1) {
        const queryIndex = (page - 1) % queryVariations.length;
        params.q = queryVariations[queryIndex];
      }

      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params,
      });

      const articles = response.data.results.map(convertNewsDataArticle);

      if (page === 1) {
        saveToCache(cacheKey, articles, CACHE_DURATION.MEDIUM);
      }

      return {
        data: articles,
        message: "News fetched successfully",
        status: 200,
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 429) {
        console.warn(
          "⚠️ Rate limit exceeded (429). Attempting to use cached data..."
        );
        const expiredCache = getFromCache<NewsArticle[]>(cacheKey, true);
        if (expiredCache && expiredCache.length > 0) {
          return {
            data: expiredCache,
            message: "Loaded from expired cache due to rate limit",
            status: 200,
          };
        }
      }
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to fetch news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // New method: Get news by region AND category combined
  getNewsByRegionAndCategory: async (
    regionCode: string,
    category: string,
    page: number = 1,
    size: number = 10
  ): Promise<APIResponse<NewsArticle[]>> => {
    const regionQueriesMap: { [key: string]: string[] } = {
      all: ["India"],
      in: ["India"],
      delhi: ["Delhi"],
      punjab: ["Punjab"],
      chandigarh: ["Chandigarh"],
      "uttar-pradesh": ["Uttar Pradesh"],
      himachal: ["Himachal Pradesh"],
      haryana: ["Haryana"],
      "madhya-pradesh": ["Madhya Pradesh"],
      "jammu-and-kashmir": ["Jammu and Kashmir"],
      bihar: ["Bihar"],
      jharkand: ["Jharkhand"],
    };

    const categoryQueriesMap: { [key: string]: string[] } = {
      home: ["news"],
      "top-news": ["top-news"],
      politics: ["politics"],
      sports: ["sports"],
      entertainment: ["entertainment"],
      business: ["business"],
      technology: ["technology"],
    };

    const regionQ = regionQueriesMap[regionCode]?.[0] || "India";
    const categoryQ = categoryQueriesMap[category]?.[0] || "news";

    const query = `${regionQ} ${categoryQ}`;
    const cacheKey = `regioncat-${regionCode}-${category}-page-${page}`;

    if (page === 1) {
      const cachedData = getFromCache<NewsArticle[]>(cacheKey);
      if (cachedData && cachedData.length > 0) {
        return {
          data: cachedData,
          message: "Loaded from cache",
          status: 200,
        };
      }
    }

    try {
      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params: {
          apikey: NEWSDATA_API_KEY,
          country: "in",
          language: "en",
          size: size > 10 ? 10 : size,
          q: query,
        },
      });

      const articles = response.data.results.map(convertNewsDataArticle);

      if (page === 1) {
        saveToCache(cacheKey, articles, CACHE_DURATION.MEDIUM);
      }

      return {
        data: articles,
        message: "Region-category news fetched successfully",
        status: 200,
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 429) {
        const expiredCache = getFromCache<NewsArticle[]>(cacheKey, true);
        if (expiredCache && expiredCache.length > 0) {
          return {
            data: expiredCache,
            message: "Loaded from expired cache due to rate limit",
            status: 200,
          };
        }
      }
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to fetch region-category news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // Get breaking news
  getBreakingNews: async (): Promise<APIResponse<NewsArticle[]>> => {
    const cacheKey = "news-breaking";

    // Try to get from cache first
    const cachedData = getFromCache<NewsArticle[]>(cacheKey);
    if (cachedData && cachedData.length > 0) {
      console.log("Loaded breaking news from cache");
      return {
        data: cachedData,
        message: "Breaking news loaded from cache",
        status: 200,
      };
    }

    try {
      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params: {
          apikey: NEWSDATA_API_KEY,
          country: "in",
          language: "en",
          size: 5,
          q: "breaking news India",
        },
      });

      const rawArticles = response?.data?.results || [];
      const articles = rawArticles.map(convertNewsDataArticle);

      // Save to cache with shorter duration (breaking news changes quickly)
      saveToCache(cacheKey, articles, CACHE_DURATION.SHORT);
      console.log("Saved breaking news to cache");

      return {
        data: articles,
        message: "Breaking news fetched successfully",
        status: 200,
      };
    } catch (error: unknown) {
      console.error("Error fetching breaking news:", error);

      // If 429 error, try to return expired cache as fallback
      if (isAxiosError(error) && error.response?.status === 429) {
        console.warn(
          "⚠️ Rate limit exceeded (429). Attempting to use cached breaking news..."
        );
        const expiredCache = getFromCache<NewsArticle[]>(cacheKey, true); // Ignore expiration
        if (expiredCache && expiredCache.length > 0) {
          console.log("✅ Returning expired cache for breaking news");
          return {
            data: expiredCache,
            message: "Loaded from expired cache due to rate limit",
            status: 200,
          };
        }
      }

      // Return error response
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to fetch breaking news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // Get featured news
  getFeaturedNews: async (
    limit: number = 10
  ): Promise<APIResponse<NewsArticle[]>> => {
    const cacheKey = `news-featured-${limit}`;

    // Try to get from cache first
    const cachedData = getFromCache<NewsArticle[]>(cacheKey);
    if (cachedData && cachedData.length > 0) {
      console.log("Loaded featured news from cache");
      return {
        data: cachedData,
        message: "Featured news loaded from cache",
        status: 200,
      };
    }

    try {
      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params: {
          apikey: NEWSDATA_API_KEY,
          country: "in",
          language: "en",
          size: limit,
        },
      });

      const articles = response.data.results.map(convertNewsDataArticle);

      // Save to cache
      saveToCache(cacheKey, articles, CACHE_DURATION.MEDIUM);
      console.log("Saved featured news to cache");

      return {
        data: articles,
        message: "Featured news fetched successfully",
        status: 200,
      };
    } catch (error: unknown) {
      console.error("Error fetching featured news:", error);

      // If 429 error, try to return expired cache as fallback
      if (isAxiosError(error) && error.response?.status === 429) {
        console.warn(
          "⚠️ Rate limit exceeded (429). Attempting to use cached featured news..."
        );
        const expiredCache = getFromCache<NewsArticle[]>(cacheKey, true); // Ignore expiration
        if (expiredCache && expiredCache.length > 0) {
          console.log("✅ Returning expired cache for featured news");
          return {
            data: expiredCache,
            message: "Loaded from expired cache due to rate limit",
            status: 200,
          };
        }
      }

      // Return error response
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to fetch featured news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // Search news
  searchNews: async (
    query: string,
    region?: string
  ): Promise<APIResponse<NewsArticle[]>> => {
    try {
      let searchQuery = query;

      // Add region to search if specified
      if (region && region !== "all") {
        const regionName = regions
          .find((r) => r.code === region)
          ?.name.toLowerCase();
        if (regionName) {
          searchQuery = `${query} ${regionName}`;
        }
      }

      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params: {
          apikey: NEWSDATA_API_KEY,
          q: searchQuery,
          language: "en",
          country: "in",
        },
      });

      const articles = response.data.results.map(convertNewsDataArticle);

      return {
        data: articles,
        message: "Search completed successfully",
        status: 200,
      };
    } catch (error: unknown) {
      console.error("Error searching news:", error);

      // Return error response
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to search news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // Get news by category
  getNewsByCategory: async (
    category: string,
    page: number = 1,
    size: number = 10
  ): Promise<APIResponse<NewsArticle[]>> => {
    // Create cache key for this specific request
    const cacheKey = `news-category-${category}-page-${page}`;

    // Try to get from cache first (only for page 1)
    if (page === 1) {
      const cachedData = getFromCache<NewsArticle[]>(cacheKey);
      if (cachedData && cachedData.length > 0) {
        return {
          data: cachedData,
          message: "Category news loaded from cache",
          status: 200,
        };
      }
    }

    try {
      // Map category names to search topics for NewsData.io
      const categoryMap: { [key: string]: string[] } = {
        politics: [
          "politics India",
          "political news India",
          "India government",
          "Indian politics",
          "election India",
          "parliament India",
        ],
        sports: [
          "sports India",
          "cricket India",
          "Indian sports news",
          "football India",
          "hockey India",
          "badminton India",
        ],
        entertainment: [
          "entertainment India",
          "Bollywood",
          "Indian cinema",
          "Indian movies",
          "TV shows India",
          "music India",
        ],
        business: [
          "business India",
          "Indian economy",
          "startup India",
          "Indian market",
          "finance India",
          "stock market India",
        ],
        technology: [
          "technology India",
          "tech India",
          "Indian startups",
          "IT India",
          "AI India",
          "software India",
        ],
        "top-news": [
          "India news",
          "India latest",
          "breaking India",
          "Indian headlines",
          "trending India",
          "viral India",
        ],
      };

      const searchVariations = categoryMap[category] || ["India"];
      // Use different search variation for different pages
      const searchTopic =
        searchVariations[(page - 1) % searchVariations.length];

      const paginationKey = `category-${category}`;

      // For page 1, reset pagination
      if (page === 1) {
        paginationCache[paginationKey] = 1;
      }

      // Build request parameters for NewsData.io
      const params: Record<string, string | number> = {
        apikey: NEWSDATA_API_KEY,
        q: searchTopic,
        language: "en",
        country: "in",
        size: size > 10 ? 10 : size, // NewsData.io max is 10
      };

      // NewsData.io uses different approach for pagination
      // We'll use different search topics to get varied content for different pages
      if (page > 1) {
        // Use different search variations for different pages to get varied content
        const searchIndex = (page - 1) % searchVariations.length;
        params.q = searchVariations[searchIndex];
      }

      const response = await axios.get(`${NEWSDATA_BASE_URL}/latest`, {
        params: params,
      });

      const articles = response.data.results.map(convertNewsDataArticle);

      // Save to cache (only page 1 for primary content)
      if (page === 1) {
        saveToCache(cacheKey, articles, CACHE_DURATION.MEDIUM);
      }

      return {
        data: articles,
        message: "Category news fetched successfully",
        status: 200,
      };
    } catch (error: unknown) {
      console.error("Error fetching category news:", error);

      // If 429 error, try to return expired cache as fallback
      if (isAxiosError(error) && error.response?.status === 429) {
        console.warn(
          "⚠️ Rate limit exceeded (429). Attempting to use cached data..."
        );
        const expiredCache = getFromCache<NewsArticle[]>(cacheKey, true); // Ignore expiration
        if (expiredCache && expiredCache.length > 0) {
          console.log("✅ Returning expired cache to avoid 429 error");
          return {
            data: expiredCache,
            message: "Loaded from expired cache due to rate limit",
            status: 200,
          };
        }
      }

      // Return error response
      return {
        data: [],
        message:
          (isAxiosError(error) && error.response?.data?.message) ||
          "Failed to fetch category news",
        status: (isAxiosError(error) && error.response?.status) || 500,
      };
    }
  },

  // Other existing methods (getBreakingNews, getFeaturedNews, searchNews, getNewsByCategory) unchanged...
  // ... You can keep your existing getBreakingNews, getFeaturedNews, searchNews, and getNewsByCategory methods here.
};

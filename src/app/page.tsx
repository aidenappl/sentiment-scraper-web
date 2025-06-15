"use client";

import ArticleModule from "@/components/index/ArticleModule";
import { fetchApi } from "@/tools/axios.tools";
import { News } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState<News[] | null>(null);

  const initialize = async () => {
    try {
      const newsData = await getNews();
      console.log("News data fetched successfully:", newsData);
      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const getNews = async (): Promise<News[]> => {
    const response = await fetchApi<News[]>({
      method: "GET",
      url: "/core/v1/news",
    });

    if (response.success) {
      setNews(response.data);
      return response.data;
    }

    throw new Error(response.error_message);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="min-h-[calc(100vh-100px)] p-4">
      {news ? (
        <div>
          {news.map((article) => (
            <ArticleModule key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}
    </div>
  );
}

"use client";

import ArticleModule from "@/components/index/ArticleModule";
import { fetchApi } from "@/tools/axios.tools";
import { News } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [news, setNews] = useState<News[] | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  const initialize = async () => {
    try {
      const newsData = await getNews(0);
      console.log("News data fetched successfully:", newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const getNews = async (offset: number = 0): Promise<News[]> => {
    if (isFetchingRef.current) return []; // prevent duplicate calls
    isFetchingRef.current = true;

    const response = await fetchApi<News[]>({
      method: "GET",
      url: "/core/v1/news",
      params: {
        limit: 25,
        offset: offset,
      },
    });

    if (response.success) {
      if (news != null) {
        setNews([news, ...response.data]);
      } else {
        setNews(response.data);
      }
      setHasMore(response.data.length === 25);
      isFetchingRef.current = false;
      return response.data;
    }

    throw new Error(response.error_message);
  };

  useEffect(() => {
    initialize();
  }, []);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingRef.current) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const newOffset = offset + 25;
          setOffset(newOffset);
          getNews(newOffset);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [offset, hasMore]
  );

  return (
    <div className="min-h-[calc(100vh-100px)] p-4">
      {news ? (
        <div>
          {news.map((article) => (
            <div key={article.id} ref={lastArticleRef}>
              <ArticleModule article={article} />
            </div>
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

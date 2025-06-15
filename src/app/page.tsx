"use client";

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
            <div
              key={article.id}
              id={article.id.toString()}
              className="mb-6 p-4 border rounded-lg text-sm"
            >
              <Link
                href={`/news/${article.id}`}
                className="flex flex-col gap-1"
              >
                <div className="flex gap-1.5 mb-2">
                  {article.tickers?.map((ticker) => (
                    <span
                      key={ticker}
                      className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                    >
                      {ticker}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="text-gray-600">{article.summary_text}</p>
                <p className="text-sm text-gray-500">
                  Posted at: {new Date(article.posted_at).toLocaleString()}
                </p>
                <div className="flex justify-between">
                  <p className="text-blue-500 font-semibold hover:underline">
                    Read more
                  </p>
                  <p>
                    {article.sentiment ? (
                      <>
                        {article.sentiment.status?.id == 4 ? (
                          <>
                            {article.sentiment.polarity?.toLowerCase() ==
                            "negative" ? (
                              <span className="bg-red-200 px-2 py-1 rounded-lg font-semibold">
                                {article.sentiment.polarity}
                              </span>
                            ) : article.sentiment.polarity?.toLowerCase() ==
                              "positive" ? (
                              <span className="bg-green-200 font-semibold px-2 py-1 rounded-lg">
                                {article.sentiment.polarity}
                              </span>
                            ) : (
                              <span className="bg-slate-300 font-semibold px-2 py-1 rounded-lg">
                                {article.sentiment.polarity}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="font-semibold">
                            {article.sentiment.status?.name}
                          </span>
                        )}
                      </>
                    ) : article.sentiment === null ? (
                      <span className="font-semibold">No Sentiment Data</span>
                    ) : (
                      <span>No Sentiment Data</span>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

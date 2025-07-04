"use client";

import { fetchApi } from "@/tools/axios.tools";
import { ApiResponse, News } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Article = () => {
  const [news, setNews] = useState<News | null>(null);
  const params = useParams<{ article: string }>();

  const fetchArticle = async (
    articleId: string
  ): Promise<ApiResponse<News>> => {
    const response = await fetchApi<News>({
      method: "GET",
      url: `/core/v1/news/${articleId}`,
    });
    return response;
  };

  const initialize = async () => {
    try {
      if (params.article) {
        const articleId = params.article;
        const data = await fetchArticle(articleId);
        if (data.success) {
          setNews(data.data);
        } else {
          console.error("Failed to fetch article:", data.error_message);
        }
      } else {
        console.error("No article ID provided in the URL.");
      }
    } catch (error) {
      console.error("Failed to fetch article:", error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);
  return (
    <div className="min-h-[calc(100vh-100px)] p-4">
      {news ? (
        <div className="grid grid-cols-3 ">
          <article className="flex flex-col gap-2 col-span-2">
            {news.tickers?.length ? (
              <div className="flex gap-1.5 mb-2">
                {news.tickers.map((ticker) => (
                  <span
                    key={ticker}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                  >
                    {ticker}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="text-4xl font-medium">{news.title}</h1>
            <span className="text-slate-900 text-lg font-medium">
              By {news.authors}
            </span>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm">
                Posted at: {new Date(news.posted_at).toLocaleString()}
              </span>
              <Link
                className="text-blue-600 text-sm"
                href={news.article_url}
                target="_blank"
              >
                Read Original Article
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {news.body_content?.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
          <div className="col-span-1">
            <div className="w-9/12 bg-[#e6e8db] h-full mx-auto rounded-md p-7 flex flex-col gap-2">
              <h2 className="text-2xl font-medium">Sentiment Analysis</h2>
              <a>
                {news.sentiment?.status?.id !== 4
                  ? news.sentiment?.status?.name
                  : null}
              </a>
              <div>
                {news.sentiment?.polarity?.toLowerCase() == "negative" ? (
                  <p className="bg-red-200 px-2 py-1 rounded-lg font-semibold w-fit text-sm capitalize">
                    {news.sentiment.polarity}
                  </p>
                ) : news.sentiment?.polarity?.toLowerCase() == "positive" ? (
                  <p className="bg-green-200 font-semibold px-2 py-1 rounded-lg w-fit text-sm capitalize">
                    {news.sentiment.polarity}
                  </p>
                ) : (
                  <p className="bg-slate-300 font-semibold px-2 py-1 rounded-lg w-fit text-sm capitalize">
                    {news.sentiment?.polarity}
                  </p>
                )}
              </div>
              <i>
                <b>Summary:</b> {news.sentiment?.sentiment_summary}
              </i>
              <div className="flex flex-col gap-0.5">
                <p>
                  <b>Score:</b>{" "}
                  {news.sentiment?.score ? news.sentiment?.score * 100 : 0}%
                </p>
                <p>
                  <b>Positive:</b>{" "}
                  {news.sentiment?.positive
                    ? news.sentiment?.positive * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Negative:</b>{" "}
                  {news.sentiment?.negative
                    ? news.sentiment?.negative * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Neutral:</b>{" "}
                  {news.sentiment?.neutral ? news.sentiment?.neutral * 100 : 0}%
                </p>
                <p>
                  <b>Confidence:</b>{" "}
                  {news.sentiment?.confidence
                    ? news.sentiment?.confidence * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Subjectivity:</b>{" "}
                  {news.sentiment?.subjectivity
                    ? news.sentiment?.subjectivity * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Language:</b> {news.sentiment?.language}
                </p>
                <p>
                  <b>Source:</b> {news.sentiment?.source}
                </p>
                <p>
                  <b>Vader Neutral:</b>{" "}
                  {news.sentiment?.vader_neu
                    ? (Math.round(news.sentiment?.vader_neu * 100) / 100) * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Vader Positive:</b>{" "}
                  {news.sentiment?.vader_pos
                    ? (Math.round(news.sentiment?.vader_pos * 100) / 100) * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Vader Negative:</b>{" "}
                  {news.sentiment?.vader_neg
                    ? (Math.round(news.sentiment?.vader_neg * 100) / 100) * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Vader Compound:</b>{" "}
                  {news.sentiment?.vader_comp
                    ? (Math.round(news.sentiment?.vader_comp * 100) / 100) * 100
                    : 0}
                  %
                </p>
                <p>
                  <b>Multitext Class:</b>{" "}
                  {news.sentiment?.multitext_class == 1
                    ? "Positive"
                    : news.sentiment?.multitext_class == 2
                    ? "Negative"
                    : "Neutral"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Article;

"use client";

import { fetchApi } from "@/tools/axios.tools";
import { News } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Article = () => {
  const [news, setNews] = useState<News | null>(null);
  const params = useParams<{ article: string }>();

  const fetchArticle = async (articleId: string): Promise<News | null> => {
    const response = await fetchApi<News>({
      method: "GET",
      url: `/core/v1/news/${articleId}`,
    });
    if (response.success) {
      setNews(response.data);
      return response.data;
    }
    throw new Error(response.error_message);
  };

  const initialize = async () => {
    try {
      if (params.article) {
        const articleId = params.article;
        await fetchArticle(articleId);
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
            <h1 className="text-4xl font-medium">{news.title}</h1>
            <span className="text-slate-900 text-lg font-medium">
              By {news.authors}
            </span>
            <span className="text-slate-500 text-sm">
              Posted at: {new Date(news.posted_at).toLocaleString()}
            </span>
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
                  <p className="bg-red-200 px-2 py-1 rounded-lg font-semibold w-fit text-sm">
                    {news.sentiment.polarity}
                  </p>
                ) : news.sentiment?.polarity?.toLowerCase() == "positive" ? (
                  <p className="bg-green-200 font-semibold px-2 py-1 rounded-lg w-fit text-sm">
                    {news.sentiment.polarity}
                  </p>
                ) : (
                  <p className="bg-slate-300 font-semibold px-2 py-1 rounded-lg w-fit text-sm">
                    {news.sentiment?.polarity}
                  </p>
                )}
              </div>
              <i>
                <b>Summary:</b> {news.sentiment?.sentiment_summary}
              </i>
              <p>
                <b>Score:</b> {news.sentiment?.score}
              </p>
              <p>
                <b>Positive:</b> {news.sentiment?.positive}
              </p>
              <p>
                <b>Negative:</b> {news.sentiment?.negative}
              </p>
              <p>
                <b>Neutral:</b> {news.sentiment?.neutral}
              </p>
              <p>
                <b>Confidence:</b> {news.sentiment?.confidence}
              </p>
              <p>
                <b>Subjectivity:</b> {news.sentiment?.subjectivity}
              </p>
              <p>
                <b>Language:</b> {news.sentiment?.language}
              </p>
              <p>
                <b>Source:</b> {news.sentiment?.source}
              </p>
              <p>
                <b>Vader Neutral:</b> {news.sentiment?.vader_neu}
              </p>
              <p>
                <b>Vader Positive:</b> {news.sentiment?.vader_pos}
              </p>
              <p>
                <b>Vader Negative:</b> {news.sentiment?.vader_neg}
              </p>
              <p>
                <b>Vader Compound:</b> {news.sentiment?.vader_comp}
              </p>
              <p>
                <b>Multitext Class:</b> {news.sentiment?.multitext_class}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Article;

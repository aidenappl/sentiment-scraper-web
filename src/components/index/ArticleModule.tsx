import { News } from "@/types";
import Link from "next/link";

const ArticleModule = ({ article }: { article: News }) => {
  return (
    <div
      id={article.id.toString()}
      className="mb-6 p-4 border rounded-lg text-sm"
    >
      <Link href={`/news/${article.id}`} className="flex flex-col gap-1">
        <div className="flex gap-1.5 mb-2">
          {article.tickers?.map((ticker) => (
            <span
              key={ticker + article.id}
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
                    {article.sentiment.polarity?.toLowerCase() == "negative" ? (
                      <span className="bg-red-200 px-2 py-1 rounded-lg font-semibold capitalize">
                        {article.sentiment.polarity}
                      </span>
                    ) : article.sentiment.polarity?.toLowerCase() ==
                      "positive" ? (
                      <span className="bg-green-200 font-semibold px-2 py-1 rounded-lg capitalize">
                        {article.sentiment.polarity}
                      </span>
                    ) : (
                      <span className="bg-slate-300 font-semibold px-2 py-1 rounded-lg capitalize">
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
  );
};

export default ArticleModule;

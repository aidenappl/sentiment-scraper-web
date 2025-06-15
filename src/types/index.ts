type Source = {
  id: number;
  name: string;
  website: string | null;
  logo: string | null;
  inserted_at: string;
};

type News = {
  id: number;
  title: string;
  summary_text: string;
  posted_at: string;
  article_source: Source;
  data_pipeline_id: string;
  unique_pipeline_id: string;
  article_url: string;
  companies: Company[] | null;
  tickers: string[] | null;
  sentiment: Sentiment | null;
  inserted_at: string;
  authors: string | null;
  body_content: string | null;
};

type Sentiment = {
  id: number | null;
  news_id: number | null;
  sentiment_summary: string | null;
  score: number | null;
  positive: number | null;
  negative: number | null;
  neutral: number | null;
  confidence: number | null;
  polarity: string | null;
  subjectivity: number | null;
  language: string | null;
  source: string | null;
  vader_neu: number | null;
  vader_pos: number | null;
  vader_neg: number | null;
  vader_comp: number | null;
  multitext_class: number | null;
  processed_at: string | null; // ISO string (time.Time in Go)
  inserted_at: string | null;  // ISO string (time.Time in Go)
  status: GeneralNSN | null;
};

type GeneralNSN = {
  id: number;
  name: string;
  short_name: string;
}

type Company = {
  id: number;
}

// Generic success response
type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

// Generic error response
type ApiError = {
  success?: false;
  error: string;
  error_message: string;
  error_code: number;
};

// Union type for API responses
type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type { GeneralNSN, Company, Sentiment, Source, News, ApiResponse };
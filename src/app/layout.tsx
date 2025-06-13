import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SentimentScraper - The Public's Podium",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  description:
    "SentimentScraper is a tool designed to analyze public sentiment on various topics by scraping and processing data from social media platforms.",
  keywords: [
    "Sentiment Analysis",
    "Social Media Scraping",
    "Public Sentiment",
    "Data Analysis",
    "SentimentScraper",
    "Aiden Appleby",
    "Web Scraping",
    "Natural Language Processing",
    "NLP",
    "Data Science",
    "Machine Learning",
    "AI",
    "Public Opinion",
    "Topic Analysis",
    "Text Analysis",
    "Sentiment Detection",
    "Social Media Analysis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[var(--background)]"
        data-new-gr-c-s-check-loaded="14.1239.0"
        data-gr-ext-installed=""
      >
        <Navigation />
        <div className="px-10 max-w-[var(--max-page-width)] mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

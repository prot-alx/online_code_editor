import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Code Editor - Online Programming Environment",
  description: "Простой онлайн редактор кода с поддержкой Python и Go",
  keywords: ["code editor", "online ide", "python", "golang"],
  openGraph: {
    title: "Code Editor",
    description: "Редактор кода для Python и Go",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Your description" />
      </head>
      <body>{children}</body>
    </html>
  );
}

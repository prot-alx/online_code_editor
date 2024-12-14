import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Code Editor - Online Programming Environment",
  description: "Простой онлайн редактор кода с поддержкой Python и Go",
  keywords: ["code editor", "online ide", "python", "golang"],
  openGraph: {
    title: "Code Editor",
    description: "Редактор кода для Python и Go",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-slate-200 text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
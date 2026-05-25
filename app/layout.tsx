import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amin Ganja — Flutter Developer",
  description: "Flutter developer with 4.5 years experience. AI-Augmented Development. Building SocietyLedger. Open to remote full-time roles.",
  keywords: ["Flutter developer", "mobile developer", "Supabase", "BLoC", "remote Flutter developer", "Ahmedabad"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

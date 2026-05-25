import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amin Momin — Flutter Developer",
  description: "Flutter developer with 4.5 years experience. AI-Augmented Development. Building SocietyLedger. Open to remote full-time roles.",
  keywords: ["Flutter developer", "mobile developer", "Supabase", "BLoC", "remote Flutter developer", "Ahmedabad"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

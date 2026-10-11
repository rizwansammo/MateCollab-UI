import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MateCollab · NetaMate Solutions",
  description: "One workspace for conversations, meetings and teamwork. Interactive frontend prototype.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

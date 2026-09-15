import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imagine Library — Grok",
  description: "A private archive for your Grok Imagine creations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Imagine Library',
  description: 'A Grok-inspired asset library for your AI creations.'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

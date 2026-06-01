import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stay in LA — Keep Hollywood Home Tracker",
  description:
    "City Council passed the Keep Hollywood Home motions. They haven't been enacted. Meet the people responsible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

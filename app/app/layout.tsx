import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chato",
  description: "Your awesome assistant for boring tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={(inter.className, "flex flex-col min-h-screen antialiased")}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}

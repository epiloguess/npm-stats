import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NPM STATS",
  description: "An unofficial, well maintained list of npm package download statistics for comparison, used for technical reference.",
};

import Nav from './Nav'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-screen-lg m-auto px-6 md:px-24  pb-10 `} >
        <Nav/>
        {children}
        
        </body>

    </html>
  );
}

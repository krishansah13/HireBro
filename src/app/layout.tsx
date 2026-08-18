import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "@/Providers";
import Navbar from "@/components/Navbar";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Hirelane | Find work that fits you",
  description:
    "Discover roles from companies hiring now, apply from one place, or post a job in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}

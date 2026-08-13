import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "@/Providers";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["vietnamese"],
  display:"auto",
  style:"normal"
});

export const metadata: Metadata = {
  title: "Hirelane | Your Job Platform",
  description: "Made By Krishan",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}

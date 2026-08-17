import type { Metadata } from "next";
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Provider from "@/Providers";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken',
});


export const metadata: Metadata = {
  title: "Hirelane | Your Job Platform",
  description: "Made By Krishan",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>
          <Navbar />
          {children}
          <FooterSection />
        </Provider>
      </body>
    </html>
  );
}

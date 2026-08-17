import type { Metadata } from "next";
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Provider from "@/Providers";

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
          {children}
        </Provider>
      </body>
    </html>
  );
}

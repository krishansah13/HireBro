import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({
    subsets: ["vietnamese"],
    display: "auto",
    style: "normal"
});

export const metadata: Metadata = {
    title: "Jobs | Find Your Dream Job",
    description: "Made By Krishan",
};

export default function RootLayout({ children }: LayoutProps<"/jobs">) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

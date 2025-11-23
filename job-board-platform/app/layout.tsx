import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobBoard Platform",
  description: `A responsive and accessible job board application where users can explore, filter, and apply for job postings. Built with modern front-end technologies and structured for real-world scalability The platform dynamically fetches job listings from an API and allows users to filter roles by category, location, and experience level. It includes responsive layouts, accessible forms, and global state management using the Context API.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}

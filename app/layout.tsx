import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Inter,Space_Grotesk} from "next/font/google"
import Navbar from "@/components/Navbar";


const inter=Inter({
  subsets:["latin"],
  variable:"--font-inter",
  weight:["300","400","500","600","700"],
  display:"swap"
})

const spaceGrotesk=Space_Grotesk({
  subsets:["latin"],
  variable:"--font-space-grotesk",
  weight:["300","400","500","600","700"],
  display:"swap"
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRICE-WISE",
  description: "track product prices effortlessly and save money on your online shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <main className="container mx-auto">
        <Navbar/>
        {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ToasterProvider from "@/components/ToasterProvider/ToasterProvider";


export const metadata: Metadata = {
  title: "Campers Rent",
  description: "Campers of your dreams",
};


const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header />
        {children}
        <ToasterProvider /> 
      </body>
    </html>
  );
}

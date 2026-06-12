import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MyEco",
    template: "%s | MyEco",
  },
  description:
    "MyEco is a carbon footprint tracker with gamification, challenges, badges, and eco impact insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><AuthProvider>{children}
        <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#0b1720",
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
      },
    }}
  /></AuthProvider></body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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
    default: "Xcollege — Notes, Food & Shops for College Students",
    template: "%s · Xcollege",
  },
  description:
    "Download notes, PYQs and study material, discover food and shops around campus, and buy or sell second-hand products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-50">
        <AuthProvider>
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

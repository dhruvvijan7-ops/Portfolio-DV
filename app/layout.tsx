import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import AppProvider from "@/components/providers/AppProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Loader from "@/components/loader/Loader";
import Navigation from "@/components/navigation/Navigation";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruv.dev"),
  title: site.meta.title,
  description: site.meta.description,
  keywords: ["Dhruv", "AI", "Cybersecurity", "Software", "Machine Learning", "Security Engineering"],
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
    siteName: "DHRUV",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#171914",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrains.variable}`}>
      <body>
        <AppProvider>
          <Loader />
          <CustomCursor />
          <Navigation />
          <main>{children}</main>
          <div className="grain" aria-hidden="true" />
        </AppProvider>
      </body>
    </html>
  );
}
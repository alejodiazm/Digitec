import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { METADATA } from "@/constants";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// Optimize Montserrat font loading - Full Family Implementation
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
  keywords: METADATA.keywords,
  openGraph: {
    title: METADATA.title,
    description: METADATA.description,
    type: "website",
    locale: "es_CO",
    url: "https://digitec.global",
    siteName: "DIGITEC GLOBAL SAS",
  },
  twitter: {
    card: "summary_large_image",
    title: METADATA.title,
    description: METADATA.description,
  },
  authors: [{ name: "DIGITEC GLOBAL SAS" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-[#F8FAFC] text-slate-900 selection:bg-primary/30`}
      >
        <div className="grain-overlay" />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}

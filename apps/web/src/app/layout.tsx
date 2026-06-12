import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Circularia | AI-Powered Circular Economy Platform",
  description: "Revolutionizing waste management with Digital Twin technology and AI-powered recycling ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "font-inter antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-primary/30"
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}

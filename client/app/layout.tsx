import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "react-hot-toast";
import ModalsProvider from "@/providers/modals";

const fontHeading = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],

  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Realtime Stocks Chart",
  description: "Realtime Stocks Chart with fluvio",
  metadataBase: new URL("https://stockviz.vercel.app"),
  openGraph: {
    images: ["https://stockviz.vercel.app/stockviz.png"],
    type: "website",
    siteName: "StockViz - Realtime Stocks Chart",
  },
  twitter: {
    images: ["https://stockviz.vercel.app/stockviz.png"],
    site: "https://stockviz.vercel.app",
    title: "StockViz - Realtime Stocks Chart",
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {children}
          <Toaster />
          <ModalsProvider />
        </body>
      </html>
    </AuthProvider>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import AuthProvider from "@/providers/auth-provider";
import AuthModal from "@/components/auth-modal";
import { Toaster } from "react-hot-toast";
import CreateChartModal from "@/components/create-chart-form";

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
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <AuthProvider session={session}>
          <AuthModal />
          <CreateChartModal />
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

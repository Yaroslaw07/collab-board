import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { ConvexReactProvider } from "@/providers/convex-client-provider";
import { ModalProvider } from "@/providers/modal-providers";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collab Board",
  description: "Collaborative whiteboard for teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <ConvexReactProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </ConvexReactProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

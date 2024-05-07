import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "prismjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/ui/side-nav/side-nav";
import Header from "@/components/ui/header/header";
import React from "react";

const inter = Inter({ subsets: ["latin", "greek"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Adelfa",
  description:
    "Documentation for the Adelfa Proof Assistant. Adelfa implements a logic for formally reasoning about LF specifications.",
  authors: [{ name: "Chase Johnson", url: "https://chasej.dev" }],
  keywords: [
    "Adelfa",
    "Proof Assistant",
    "Logic",
    "LF",
    "Dependent Types",
    "Formal Verification",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div data-pagefind-ignore className="hidden md:block">
              <SideNav />
            </div>
            <div className="flex flex-col min-w-0 w-full">
              <Header />
              <main className="mt-8 flex flex-1 items-center flex-col gap-4 p-8 lg:gap-6 lg:p-6">
                <div className="flex w-full md:max-w-l lg:max-w-3xl flex-col gap-4 lg:gap-6 lg:p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

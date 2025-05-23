import Navbar from "@/components/navbar";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Triple Better",
  description: "by Mauricio Fragale",
  icons: [{ rel: "icon", url: "/icon-circle.png" }],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            <Navbar />
            <div className="inset-x-4 mx-auto w-full max-w-screen-xl">
              <div className="px-4 pt-20 lg:pt-28">{children}</div>
            </div>
          </Providers>
        </NextIntlClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}

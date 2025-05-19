'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { useState } from 'react';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen mx-auto my-4 md:my-8 lg:my-12 max-w-7xl px-4">
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
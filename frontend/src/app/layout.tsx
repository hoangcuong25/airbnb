import { Toaster } from 'sonner';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppContextProvider from '@/context/AppContext';
import Footer from '@/components/guest/Footer';
import FontAwesomeLoader from '@/components/FontAwesomeLoader';

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 mx-auto my-6 lg:my-8 max-w-[1800px] w-full px-6">
              {children}
              <Toaster position="top-right" />
            </main>
            <Footer />
          </div>
        </AppContextProvider>
        <FontAwesomeLoader />
      </body>
    </html>
  );
}
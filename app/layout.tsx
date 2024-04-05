import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import { Themeprovider } from "@/context/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon App",
  description:
    "This is a Pokemon App that is built with Next.js TailwindCSS and Shadcn UI. This app is a simple app that fetches data from the Pokemon API and displays it in a beautiful way.",
  icons: {
    icon: "/images/poke-ball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Themeprovider>
          <ReactQueryProvider>
            <TooltipProvider>
              <Navbar />
              <main className="px-8 py-32 md:px-16">{children}</main>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: "bg-card dark:bg-card dark:text-white text-black",
                }}
              />
              <ScrollToTop />
            </TooltipProvider>
          </ReactQueryProvider>
        </Themeprovider>
      </body>
    </html>
  );
}

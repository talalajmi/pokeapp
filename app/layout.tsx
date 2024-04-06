import "../app/globals.css";

import React from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import { Themeprovider } from "@/context/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Themeprovider>
          <ReactQueryProvider>
            <TooltipProvider>
              <Navbar />
              <main className="px-8 py-32 md:px-16">{children}</main>
              <Footer />
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

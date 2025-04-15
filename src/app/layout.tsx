import "./globals.css";
import Providers from "@/app/providers";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster position="top-center" />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { NavMenu } from "@/components/custom/nav-menu";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/custom/footer";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoomRover | Find Your Room",
  description: "Find your Room and stay with us",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={cn("flex justify-between flex-col", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div>
              <NavMenu />
              <Separator className="mb-5" />
              {children}
            </div>
            <Footer />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}

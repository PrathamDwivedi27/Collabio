import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google"
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  title: "Collabio",
  description: "Collabio is a platform for collaborative writing and editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        
        <ConvexClientProvider>
          <Toaster/>
          {children}
        </ConvexClientProvider>
        
      </body>
    </html>
  );
}

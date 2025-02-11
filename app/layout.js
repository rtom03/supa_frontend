import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationMenuDemo } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from '@/components/Navbar';




const geistSans = Geist({
  variable: "--font-geist-sans", 
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SupaBetos",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="h-screen flex flex-col">

{/* ✅ Navbar - Fixed at the Top */}
<Navbar/>

{/* ✅ Sidebar & Content - Push Down Below Navbar */}
<div className="flex flex-1 pt-[64px]"> 
  <SidebarProvider>
    {/* Sidebar (On the Left) */}
    <AppSidebar className="relative" />

    {/* Main Content (Takes Remaining Space) */}
    <main className="flex-1">
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
</div>
</div>
      </body>
    </html>
  );
}

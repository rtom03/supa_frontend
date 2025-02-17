'use client'
import { AppSidebar } from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import React from 'react';
import ban from '../public/image.png'
import { Carousel } from '@/components/Carousel';
import Rightbar from '@/components/Rightbar';
import { ImageGrid } from '@/components/ImageGrid';
import GameList from '@/components/GameList';
import MobileNavbar from '@/components/MobileComponent/MobileNavbar';


export default function RootLayout({ children }) {
  return (
   <div >
     <div className="h-screen flex flex-col">
            {/* <Navbar/> */}
            <div className="flex flex-1 pt-[64px]"> 
                <SidebarProvider>
                      <AppSidebar className="relative hidden md:block" />
                      <main className="flex-1 " >
                        <Carousel/>
                        <div className='hidden md:block'>
                           <ImageGrid/>
                        </div>
                        
                        <GameList/>
                        {/* <div className='flex '> */}
                        {/* {children} */}
                      </main>
                </SidebarProvider>
                <div className=''>
                  {/* <Rightbar/> */}
                </div>
            </div> 
         </div>
        {/* {children} */}
   </div>
  );
}
    
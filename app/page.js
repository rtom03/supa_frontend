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


export default function RootLayout({ children }) {
  return (
   <div >
     <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex flex-1 pt-[64px]"> 
                <SidebarProvider>
                      <AppSidebar className="relative" />
                      <main className="flex-1 " >
                        <Carousel/>
                        <ImageGrid/>
                        <GameList/>
                        {/* <div className='flex '> */}
     {/* <div className='flex flex-col  items-center  ml-5'>
      <Image
      src={ban}
      width={120}
      height={120}
      alt='img'/>
     <p className='flex'>Football</p>
     </div>
     <div className='flex flex-col  items-center  ml-5'>
      <Image
      src={ban}
      width={120}
      height={120}
      alt='img'/>
     <p className='flex'>Football</p>
     </div><div className='flex flex-col  items-center  ml-5'>
      <Image
      src={ban}
      width={120}
      height={120}
      alt='img'/>
     <p className='flex'>Football</p>
     </div>
     </div> */}
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
    
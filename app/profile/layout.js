import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from '@/components/Navbar';
import Rightbar from "@/components/Rightbar";
import { MantineProvider } from "@mantine/core";
import ProfileSidebar from "@/components/ProfileSidebar";

export default async function ProfileLayout({ children, params }) {   
    return (
       <div className="flex flex-1 pt-[64px]"> 
                            <SidebarProvider>
                                  <ProfileSidebar className="relative" />
                                  <main className="flex-1 w-[300px]" >
                                    <SidebarTrigger />
                                   {children}
                                  </main>
                            </SidebarProvider>
                            <div className=''>
                          
                            </div>
                        </div> 
    )  
  }
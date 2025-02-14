import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from '@/components/Navbar';
import Rightbar from "@/components/Rightbar";
import { MantineProvider } from "@mantine/core";

export default async function DashboardLayout({ children, params }) {   
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div className="flex flex-1 pt-[64px]"> 
                <SidebarProvider>
                      <AppSidebar className="relative" />
                      <main className="flex-1 w-[300px]" >
                        <SidebarTrigger />
                        {children}
                      </main>
                </SidebarProvider>
                <div className=''>
                <Rightbar/>
                </div>
            </div> 
         </div>
        {/* {children} */}
      </MantineProvider>
    )
  }
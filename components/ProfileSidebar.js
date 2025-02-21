import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { IconBallFootball,IconBallBasketball,IconBallAmericanFootball,IconMoodHappy,IconCricket, Icon12Hours, IconWallet, IconCashBanknoteFilled, IconHistory, IconTransactionDollar, IconNotification, IconLocation } from "@tabler/icons-react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,  
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"  

// Menu items.
const items = [
  {
    title: "Deposit",
    url: "/profile/deposit",
    icon: IconWallet,
  },
  {
    title: "Withdraw",  
    url: "/profile/withdraw",
    icon: IconCashBanknoteFilled,
  },
  {
    title: "Bet History",
    url: "/profile/history",
    icon: IconHistory,
  },
  {
    title: "Transaction",
    url: "/profile/transaction",
    icon: IconTransactionDollar,
  },
  {
    title: "Notification",
    url: "/profile/notification",
    icon: IconNotification,
  },
  {
    title: "Rooms",
    url: "/profile/rooms",
    icon: IconLocation,
  },
]

const ProfileSidebar = () => {
  return (
 <Sidebar>
       <SidebarContent>
         <SidebarGroup>
           <SidebarGroupLabel>Application</SidebarGroupLabel>
           <SidebarGroupContent>
             <SidebarMenu>
               {items.map((item) => (
                 <SidebarMenuItem key={item.title}>
                   <SidebarMenuButton asChild className={'mt-5'}>
                     <a href={item.url}>
                       <item.icon />
                       <span>{item.title}</span>
                     </a>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
               ))}
             </SidebarMenu>
           </SidebarGroupContent>
         </SidebarGroup>
       </SidebarContent>
     </Sidebar>
  )
}

export default ProfileSidebar

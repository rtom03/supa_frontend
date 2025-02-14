import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { IconBallFootball,IconBallBasketball,IconBallAmericanFootball,IconMoodHappy,IconCricket, Icon12Hours } from "@tabler/icons-react"


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
    title: "Football",
    url: "/dashboard/football",
    icon: IconBallFootball,
  },
  {
    title: "Basketball",  
    url: "/dashboard/basketball",
    icon: IconBallBasketball,
  },
  {
    title: "NFL",
    url: "/dashboard/nfl",
    icon: IconBallAmericanFootball,
  },
  {
    title: "Hockey",
    url: "/dashboard/hockey",
    icon: IconCricket,
  },
  {
    title: "Entertainment",
    url: "/entertainments",
    icon: IconMoodHappy,
  },
  {
    title: "Politics",
    url: "/politics",
    icon: Icon12Hours,
  },
]

export function AppSidebar() {
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



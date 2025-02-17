"use client";

import Link from "next/link";
import { Home, Search, Bell, User } from "lucide-react";
import { IconBallFootball,IconBallBasketball,IconBallAmericanFootball,IconMoodHappy,IconCricket, Icon12Hours } from "@tabler/icons-react"


const BottomNavbar = () => {  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-2">
      <div className="flex justify-around items-center">
        <NavItem href="/" icon={<Home size={24} />} label="Home" />
        <NavItem href="/dashboard/football" icon={<IconBallFootball size={24} />} label="Football" />
        <NavItem href="/dashboard/basketball" icon={<IconBallBasketball size={24} />} label="Basketball" />
        <NavItem href="/dashboard/hockey" icon={<IconBallAmericanFootball size={24} />} label="NFL" />
        <NavItem href="/politics" icon={<Icon12Hours size={24} />} label="Politics" />
        <NavItem href="/entertainments" icon={<IconMoodHappy size={24} />} label="Entertainments" />


      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center text-gray-600 hover:text-black">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default BottomNavbar;

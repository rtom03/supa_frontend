import React from 'react'
import { NavigationMenuDemo } from '@/components/Navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";


const Navbar = () => {
  return (
   <div className="fixed top-0 left-0 w-full bg-yellow-400 p-3 flex justify-evenly items-center shadow-md z-50">
          <div className="flex items-center gap-3">
            <Link href={'/'}>
            <h1>SUPABETOS</h1>
            </Link>
            <NavigationMenuDemo />
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
  )
}

export default Navbar

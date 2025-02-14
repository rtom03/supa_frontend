// 'use client'
// import React from 'react'
// import { NavigationMenuDemo } from '@/components/Navigation';
// import Link from 'next/link';
// import { Button } from './ui/button';




// const Navbar = () => {

//   return (
//    <div className="fixed top-0 left-0 w-full bg-yellow-400 p-3 flex justify-evenly items-center shadow-md z-50 ">
//           <div className="flex items-center gap-3">
//                   <Link href={'/'}>
//                   <h1>SUPABETOS</h1>
//                   </Link>
//                   <NavigationMenuDemo />
//           </div>
//           <div className="flex items-center gap-2 ml-48">
//             <Link href={'/sign-up'}>
//             <Button>Register</Button>
//             </Link>
//             <Link href={'/sign-in'}>   
//             <Button>Login</Button>
//             </Link>
//           </div>
//         </div>
//   )
// }

// export default Navbar
'use client'
import React, { useEffect, useState } from 'react';
import { NavigationMenuDemo } from '@/components/Navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 p-3 flex justify-evenly items-center shadow-md z-50">
      <div className="flex items-center gap-3">
        <Link href={'/'}>
          <h1>SUPABETOS</h1>
        </Link>
        <NavigationMenuDemo />
      </div>
      <div className="flex items-center gap-2 ml-48">
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link href={'/sign-up'}>
              <Button>Register</Button>
            </Link>
            <Link href={'/sign-in'}>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
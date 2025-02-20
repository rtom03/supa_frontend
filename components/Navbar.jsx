'use client';
import React, { useEffect, useState } from 'react';
import { NavigationMenuDemo } from '@/components/Navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PuffLoader } from 'react-spinners';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [user,setUser] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "yellow",
  };


  // Function to fetch protected data and check authentication
  const fetchProtectedData = async () => {

    // const accessToken = localStorage.getItem('access_token');
    const getCookie = (name) => {
      const cookies = document.cookie.split('; ');
      const cookie = cookies.find(row => row.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
  };
  
  const accessToken = getCookie('access_token'); // Retrieve token  

    if (!accessToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected-endpoint/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
   
      if (!response.ok) {
        throw new Error('Failed to fetch protected data');
      }

      const data = await response.json();
      // console.log('Protected data:', data);
      setUser(data)
      setIsAuthenticated(true); // User is authenticated
    } catch (error) {
      console.error('Error fetching protected data:', error);
      setIsAuthenticated(false); // User is not authenticated
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  // Function to handle logout
  const handleLogout = async() => {
    setLoading(true);

    try{
       // Simulate an API call (replace this with actual logout API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      localStorage.removeItem('access_token'); // Remove the access token
      localStorage.removeItem('refresh_token'); 
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";// Remove the refresh token
      setIsAuthenticated(false); // Update authentication state
      router.push('/sign-in'); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  
  };

  // Check authentication status on component mount
  useEffect(() => {
    fetchProtectedData();
  }, []);

  if (loading) return <div className="flex flex-col justify-center items-center h-screen">
      <PuffLoader
        // color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="yellow"
      />
      <h1>Loading...</h1>
  </div>;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 p-3 flex justify-between items-center shadow-md z-50">
  {/* Logo */}
  <Link href={'/'}>
    <h1 className="text-lg font-bold">SUPABETOS</h1>
  </Link>

  {/* Navigation Menu (Visible on md and larger) */}
  <div className="hidden md:block">
    <NavigationMenuDemo />
  </div>

  {/* Auth Buttons (Mobile-friendly) */}
  <div className="flex items-center gap-2">
    {isAuthenticated ? (
      <>
        <p className="text-sm">Hello {user.user.username}</p>
        <Button onClick={handleLogout} variant="yellow" className="bg-yellow-200 text-sm">
          {isLoading ? <Loader className="animate-spin" size={20} /> : "Logout"}
        </Button>
      </>
    ) : (
      <>
        <Link href={'/sign-up'}>
          <Button className="text-sm px-3 py-2">Register</Button>
        </Link>
        <Link href={'/sign-in'}>
          <Button className="text-sm px-3 py-2">Login</Button>
        </Link>
      </>
    )}
  </div>
</div>

  );
};

export default Navbar;
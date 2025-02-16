


'use client';
import React, { useEffect, useState } from 'react';
import { NavigationMenuDemo } from '@/components/Navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [user,setUser] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()


  // Function to fetch protected data and check authentication
  const fetchProtectedData = async () => {

    // const accessToken = localStorage.getItem('access_token');
    const getCookie = (name) => {
      const cookies = document.cookie.split('; ');
      const cookie = cookies.find(row => row.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
  };
  
  const accessToken = getCookie('access_token'); // Retrieve token
  // console.log("cookie does get token",accessToken);
  

    if (!accessToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/protected-endpoint/', {
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

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 p-3 flex justify-evenly items-center shadow-md z-50">
      <div className="flex items-center gap-3">
        <Link href={'/'}>
          <h1>SUPABETOS</h1>
        </Link>
        <NavigationMenuDemo />
      </div>
      <div className="flex items-center gap-2 ml-48">
        {isAuthenticated ? (
          <>
          <p>Hello {user.user.username}</p>
          <Button onClick={handleLogout} variant='yellow' className="bg-yellow-200">
          {isLoading ? <Loader className="animate-spin" size={20} /> : "Logout"}

          </Button>
        </>
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
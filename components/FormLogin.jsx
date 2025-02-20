import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie"; // Install with `npm install js-cookie`
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import { PuffLoader } from 'react-spinners';



const FormLogin = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
});


const [loading,setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true); // State to handle loading state

const router = useRouter()
const { toast } = useToast()


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(true)

        const response = await fetch('https://supa-arzf.onrender.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            Cookies.set('access_token', data.tokens.access, { secure: true, sameSite: 'Strict' });
            Cookies.set('refresh_token', data.tokens.refresh, { secure: true, sameSite: 'Strict' });

            localStorage.setItem('access_token',data.tokens)
            localStorage.setItem('refresh_token',data.tokens)


            Cookies.set('user', JSON.stringify(data.user));
            router.push('/');
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Password or username is incorrect.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        }
    } catch (error) {
        toast('password or username incorrect.');
    }finally{
        setLoading(false)
    }
};


// const refreshAccessToken = async () => {
//   try {
//       const refreshToken = Cookies.get('refresh_token');
//       if (!refreshToken) {
//           throw new Error("No refresh token available");
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}token/refresh/`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ refresh: refreshToken }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//           // Save new access token
//           Cookies.set('access_token', data.access, { secure: true, sameSite: 'Strict' });
//           localStorage.setItem('access_token', data.access);

//           return data.access;
//       } else {
//           throw new Error("Failed to refresh token");
//       }
//   } catch (error) {
//       console.error("Error refreshing token:", error);
//       logoutUser();
//   }
// };


// const fetchWithAuth = async (url, options = {}) => {
//   let accessToken = Cookies.get('access_token');

//   const response = await fetch(url, {
//       ...options,
//       headers: {
//           ...options.headers,
//           Authorization: `Bearer ${accessToken}`
//       }
//   });

//   if (response.status === 401) {
//       // Access token might be expired, refresh it
//       accessToken = await refreshAccessToken();
//       if (!accessToken) {
//           throw new Error("Unable to refresh access token");
//       }

//       // Retry request with new token
//       return fetch(url, {
//           ...options,
//           headers: {
//               ...options.headers,
//               Authorization: `Bearer ${accessToken}`
//           }
//       });
//   }

//   return response;
// };



// useEffect(() => {
//     const refreshInterval = setInterval(refreshAccessToken, 15 * 60 * 1000); // Refresh every 15 minutes
//     return () => clearInterval(refreshInterval);
// }, []);



const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const isDisabled = !formData.username || !formData.password;

  return (
   
    <div className="flex justify-center items-center min-h-screen p-4">
  <div className="flex flex-col gap-3 p-6 bg-yellow-500 w-full max-w-sm text-white rounded-md shadow-lg">
    <h1 className="text-red-600 text-center text-lg font-semibold">Authentication</h1>
    
    <div className="flex flex-col gap-2">
      <Label>Username</Label>
      <Input 
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label>Password</Label>
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md"
      />
    </div>

    <Button 
      variant="yellow" 
      className="hover:bg-yellow-300 text-white w-full mt-2 py-2"
      onClick={handleSubmit} 
      disabled={isDisabled}
    >
      {loading ? <Loader className="animate-spin" size={20} /> : "Login"}
    </Button>

    <strong className="flex justify-center items-center gap-1 text-sm">
      New here? <Link href={'/sign-up'} className="underline">Sign up</Link>
    </strong>
  </div>
</div>

  )
}

export default FormLogin

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie"; // Install with `npm install js-cookie`
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';



const FormLogin = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
});

const [loading,setLoading] = useState(false)
const router = useRouter()


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


            // console.log("Tokens saved:", data.tokens);
            // console.log("User details:", data.user);

            // Redirect or update UI
            router.push('/');
             // Example: Redirect to dashboard
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }finally{
        setLoading(false)
    }
};

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const isDisabled = !formData.username || !formData.password;
  return (
    <div className=' flex justify-center items-center mt-24'> 

        <div className='flex flex-col g-3 p-7 bg-yellow-500 w-[400px] text-white gap-3 rounded-sm'>
        <h1 className='text-red-600'>Authentication</h1>
                <div>
                    <Label>Username</Label>
                    <Input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required/>
                <Label>Password</Label>
                </div>
                <div>
                    <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    /> 
                </div>
                <Button variant='yellow' className="hover:bg-yellow-300 text-white w-[100%] mt-2" onClick={handleSubmit} disabled={isDisabled}>
                {loading ? <Loader className="animate-spin" size={20} /> : "Login"}

                </Button>
                <strong className='flex justify-center items-center'>New here?<Link href={'/sign-up'}>sign up</Link></strong>
        </div>
    </div>
  )
}

export default FormLogin

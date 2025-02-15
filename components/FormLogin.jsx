import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie"; // Install with `npm install js-cookie`



const FormLogin = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
});


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            // alert(data.message); // "Login successful."
            // Save tokens to localStorage
            // localStorage.setItem('access_token', data.tokens.access);
            // localStorage.setItem('refresh_token', data.tokens.refresh);
            Cookies.set('access_token', data.tokens.access, { secure: true, sameSite: 'Strict' });
            Cookies.set('refresh_token', data.tokens.refresh, { secure: true, sameSite: 'Strict' });
            // Optionally, save user details to state or localStorage
            // localStorage.setItem('user', JSON.stringify(data.user));
            Cookies.set('user', JSON.stringify(data.user));


            console.log("Tokens saved:", data.tokens);
            console.log("User details:", data.user);

            // Redirect or update UI
            window.location.href = '/';
             // Example: Redirect to dashboard
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
};

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};


const refreshToken = localStorage.getItem('refresh_token');

// fetch('http://127.0.0.1:8000/token/refresh/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ refresh: refreshToken }),
// })
// .then(response => response.json())
// .then(data => {
//     localStorage.setItem('access_token', data.access); // Save the new access token
//     console.log("New access token:", data.access);
// })
// .catch(error => {
//     console.error("Error refreshing token:", error);
// });


const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
};


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
                <Button variant='yellow' className="hover:bg-yellow-300 text-white w-[100%] mt-2" onClick={handleSubmit}>Login</Button>
                <strong className='flex justify-center items-center'>New here?<Link href={'/sign-up'}>sign up</Link></strong>
        </div>
    </div>
  )
}

export default FormLogin

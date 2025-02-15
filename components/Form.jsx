import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import React, { useState } from 'react';
import Link from 'next/link';


const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        comfirm_password: ''
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            // alert(data.message); // "User registered successfully."
            window.location.href = '/sign-in';

        } else {
            alert(`Error: ${JSON.stringify(data)}`);
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


  return (
    <div className=' flex justify-center items-center mt-24'> 
    <div className='flex flex-col g-3 p-7 bg-yellow-500 w-[400px] text-white gap-3 rounded-sm'>
        <h1 className='text-red-600'>Registration</h1>
       
        <form onSubmit={handleSubmit}>
        <div>
                <Label>Username</Label>
                <Input 
                type="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                />
        </div>
        <div>
            <Label>Email Address</Label>
                    <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
        </div>
        <div>
                <Label>Password</Label>
                    <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
        </div>
        <div>
                <Label>Comfirm Password</Label>
                    <Input
                    type="password"
                    name="comfirm_password"
                    value={formData.comfirm_password}
                    onChange={handleChange}
                    required
                    />
        </div>
                     <Button  variant="yellow" className=" hover:bg-yellow-300 text-white w-[100%] mt-2">Register</Button>
                     <strong  className='flex justify-center items-center'>Already have an account?<Link href={'/sign-in'}>Login</Link></strong>

             </form>
    </div>
    </div>
  )
}

export default Form

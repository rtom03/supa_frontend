import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import React, { useState } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ToastAction } from './ui/toast';
import { useToast } from '@/hooks/use-toast';


const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        comfirm_password: ''
    });

    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            // alert(data.message); // "User registered successfully."
            router.push('/sign-in');

        } else {
             toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Password or username is incorrect.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                    })

        }
    } catch (error) {
        console.log('An error occurred. Please try again.',error);

    }finally{
        setIsLoading(false)
    }
};


const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
};

const isDisabled = !formData.username || !formData.comfirm_password;


  return (
    <div className="flex justify-center items-center min-h-screen p-4">
  <div className="flex flex-col gap-4 p-6 bg-yellow-500 w-full max-w-sm text-white rounded-md shadow-lg">
    <h1 className="text-red-600 text-center text-lg font-semibold">Registration</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <Label>Email Address</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
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

      <div className="flex flex-col gap-2">
        <Label>Confirm Password</Label>
        <Input
          type="password"
          name="comfirm_password"
          value={formData.comfirm_password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md"
        />
      </div>

      <Button
        type="submit"
        variant="yellow"
        className="hover:bg-yellow-300 text-white w-full mt-2 py-2"
        disabled={isDisabled}
      >
        {isLoading ? <Loader className="animate-spin" size={20} /> : "Register"}
      </Button>

      <strong className="flex justify-center items-center gap-1 text-sm">
        Already have an account? <Link href={'/sign-in'} className="underline">Login</Link>
      </strong>
    </form>
  </div>
</div>

  )
}

export default Form

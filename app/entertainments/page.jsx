"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getCookie } from "cookies-next";

const Entertainment = () => {


  const [rooms, setRooms] = useState([]);
  const [roomCount, setRoomCount] = useState(0);
  const [roomMessages, setRoomMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const accessToken = getCookie("access_token");


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://supa-arzf.onrender.com/?q=${searchQuery}`);
      setRooms(response.data.rooms);
      setRoomCount(response.data.room_count);
      setRoomMessages(response.data.room_message);
      // console.log(accessToken)

      // console.log(response.data.rooms)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getCookie = (name) => {
  //   if (typeof document !== "undefined") {
  //     const cookies = document.cookie.split("; ");
  //     const cookie = cookies.find((row) => row.startsWith(name + "="));
  //     return cookie ? cookie.split("=")[1] : null;
  //   }
  //   return null;
  // };
  
  // const accessToken = getCookie("access_token");

  


  useEffect(() => {
    fetchData();
  }, [searchQuery]);


   const [formData, setFormData] = useState({
      name: '',
      description: '',
    });

    const [message, setMessage] = useState('');
    const [room, setRoom] = useState(null);

  // const accessToken = getCookie('access_token'); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await new Promise((resolve) => setTimeout(resolve,2000))
        setLoading(true)
      

      // 'http://127.0.0.1:8000
        const response = await fetch('https://supa-arzf.onrender.com/createroom/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Add token for authentication
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast("Your room has been created successfully")

          setMessage(data.message);
          setRoom(data.room); // Save the created room data  
          router.push('/');

        } else {
          setMessage(`Error: ${data.message}`);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }finally{
        setLoading(false)
      }
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  


  return (
    <div className="grid grid-cols-4 mt-16 gap-6 px-6">
      {/* Main Content (Bets Section) */}
      <div className="col-span-3 p-2">
        {/* Header */}
        <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            {/* <Link href="/components">Components</Link> */}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {/* <BreadcrumbPage>Breadcrumb</BreadcrumbPage> */}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b gap-3">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-thin md:font-bold text-gray-800">
  Entertainments
</h1>

  <Popover>
    <Button variant="yellow" className="hover:bg-yellow-200 text-white w-full md:w-auto">
      <PopoverTrigger>Create Room</PopoverTrigger>
    </Button>
    <PopoverContent>
      <label>Name</label>
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <label>Description</label>
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        variant="yellow"
        className="hover:bg-yellow-200 text-white w-full mt-2"
        onClick={handleSubmit}
        disabled={!accessToken}
      >
        {loading ? <Loader className="animate-spin" size={20} /> : "Create room"}
      </Button>
    </PopoverContent>
  </Popover>
</div>


        {/* Tweets (Bets) */}
        <div className="space-y-6 mt-4">
          {rooms.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-100 transition">

              {/* Avatar & Name */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-500">
                  {/* <AvatarImage src={item.image.src} className="rounded-full" /> */}
                  <AvatarFallback>{item.host.username.charAt(0).toUpperCase()}</AvatarFallback>

                </Avatar>
                
                <Link  href={accessToken ? `/room/${item.id}` : '/sign-in'}>
                <h2 className="text-sm sm:text-lg font-semibold text-gray-900">{item.name}</h2>
                </Link>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-gray-700">{item.description}</p>
      <p className="mt-2 text-xs sm:text-sm text-gray-700">
        {new Date(item.updated).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
      <hr className="my-3 border-gray-300" />
              {/* Actions (Optional - Like, Comment, Share) */}
              <div className="flex justify-between text-gray-500 text-sm">
                <button className="hover:text-blue-500">💬 Comment</button>
                {/* <button className="hover:text-red-500">❤️ Like</button>
                <button className="hover:text-green-500">🔄 Share</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      {/* Sidebar (Recent Activities) */}
      <div className="col-span-1 bg-yellow-50 p-6 rounded-xl shadow-lg border border-gray-200 hidden md:block">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h1>
        <ul className="space-y-3">
          <li className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition">
            User A placed a bet 🎰
          </li>
          <li className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition">
            User B won 10x payout 🎉
          </li>
          <li className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition">
            User C placed a bet on sports ⚽
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Entertainment;

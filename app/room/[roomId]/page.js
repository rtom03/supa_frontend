"use client";
import { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation"; // ✅ Correct way to get dynamic route params in App Router
// import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from 'date-fns';


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Link from "next/link";
// import ClipLoader from "react-spinners/ClipLoader";
import { FadeLoader, HashLoader, PuffLoader, SyncLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCookie } from "cookies-next";




export default function RoomPage() {


  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "yellow",
  };

  const { roomId } = useParams(); // ✅ Get roomId from URL
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const { toast } = useToast()
  const router = useRouter()
  const user = getCookie('user')

  useEffect(() => {
    if (!roomId) return; // Prevent fetching before roomId is available

    const getCookie = (name) => {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      }
      return null;
    };
    const accessToken = getCookie('access_token')
    
    const fetchRoom = async () => {
      try {
      //   const getCookie = (name) => {
      //     const cookies = document.cookie.split('; ');
      //     const cookie = cookies.find(row => row.startsWith(name + '='));
      //     return cookie ? cookie.split('=')[1] : null;
      // };
      
      // const accessToken = getCookie('access_token'); 
      // console.log("cookie got the token",accessToken)

        const response = await axios.get(`http://127.0.0.1:8000/room/${roomId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure authentication
          },
          withCredentials: true, 
        });
        setRoom(response.data);
        // console.log(response.data)
        console.log(user)
        setMessages(response.data.messages || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handlePostMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await axios.post(
        `https://supa-arzf.onrender.com/room/${roomId}/`,
        { body: message },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages([...messages, response.data.data]);
      console.log(accessToken)
    // Add new message to list
      setMessage(""); // Clear input field
      console.log(response.data)
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleDelete = async ()=>{
         try{

          const response = await axios.delete(`https://supa-arzf.onrender.com/room/${roomId}/delete/`,{
            headers:{
              Authorization:`Bearer ${accessToken}`,
              "Content-Type": "application/json",
            }
          })
          if (response.status === 204) {
            toast({
              description: "Room has been deleted successfully.",
            })            
      
            // Option 1: Redirect to another page (e.g., home page)
            router.push("/entertainments");
          }
         }catch(error){
          console.error(error)
       
         if (error.response) {
          // Server responded with a status code outside the 2xx range
          if (error.response.status === 403) {
            toast({description:"Access Denied: You are not authorized to delete this room."});
          } else if (error.response.status === 404) {
            toast({description:"Room not found."});
          } else {
            toast({description:"An error occurred while deleting the room."});
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast({description:"No response from the server. Please check your connection."});
        } else {
          // Something happened in setting up the request
          toast({description:"An unexpected error occurred."});
        }
      }
      
  }


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
  if (!room) return  <div className="flex flex-col justify-center items-center h-screen"> <p>Room not found.</p></div>;
 
  return (
    <div className="grid grid-cols-4 mt-16 gap-6 px-6">
      {/* Chat Section */}
      <div className="col-span-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
          <div>
          <Link href="/">Home</Link>
          </div>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
          <Link href="/entertainments">Entertainments</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {/* <BreadcrumbPage>Breadcrumb</BreadcrumbPage> */}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    {/* {room.host == room.host && <Button>Delete Room</Button>} */}
   {user.username === room.host.username &&
    <AlertDialog>
  <AlertDialogTrigger>
    <Button variant={'destructive'} className="w-full sm:w-auto">Delete Room</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto">Delete</AlertDialogAction> 
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>}
    </div>
  {/* Room Info */}
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 relative flex flex-col h-[70vh] sm:h-[90vh] mt-3">

  <div className="border-b pb-3 mb-3">
    <h1 className="text-lg sm:text-3xl font-bold text-gray-800">{room.name}</h1>
    <p className="text-gray-500 text-xs sm:text-sm">{room.description}</p>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
    {messages.length > 0 ? (
      messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 sm:p-3 max-w-[90%] sm:max-w-[75%] rounded-lg shadow-sm text-xs sm:text-sm ${
            msg.user.username === 'Me' ? 'bg-blue-500 text-white ml-auto' : 'bg-white text-gray-800'
          }`}
        >
          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <Avatar className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-500">
              <AvatarFallback>{msg.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{msg.user.username}</p>
              <p className="">{msg.body}</p>
            </div>
          </div>
          <p className="text-gray-400 text-[10px] sm:text-xs mt-1">{moment(msg.created_at).fromNow()}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-400 text-center text-xs sm:text-sm">No messages yet.</p>
    )}
  </div>

  {/* Message Input */}
  <div className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 border-t mt-3">
    <input
      className="flex-1 p-2 sm:p-3 border rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Write a message..."
      value={message}
    />
    <Button
      onClick={handlePostMessage}
      variant='yellow'
      className="px-4 py-2 sm:px-5 sm:py-3 text-white rounded-lg hover:bg-yellow-200 transition-all text-xs sm:text-sm"
    >
      Send
    </Button>
  </div>
</div>

      </div>

      {/* Recent Activities Section */}
      <div className="col-span-1 bg-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200 hidden md:block">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h1>
        <ul className="space-y-4">
          <li className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition">
            User A placed a bet 🎰
          </li>
          <li className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition">
            User B won 10x payout 🎉
          </li>
          <li className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition">
            User C placed a bet on sports ⚽
          </li>
        </ul>
      </div>
    </div>
  );
}


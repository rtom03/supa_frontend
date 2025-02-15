"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // ✅ Correct way to get dynamic route params in App Router
import { Input } from "@/components/ui/input";

export default function RoomPage() {
  const { roomId } = useParams(); // ✅ Get roomId from URL
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return; // Prevent fetching before roomId is available
    
    const fetchRoom = async () => {

      try {
        const getCookie = (name) => {
          const cookies = document.cookie.split('; ');
          const cookie = cookies.find(row => row.startsWith(name + '='));
          return cookie ? cookie.split('=')[1] : null;
      };
      
      const accessToken = getCookie('access_token'); 
      // console.log("cookie got the token",accessToken)

        const response = await axios.get(`https://supa-arzf.onrender.com/room/${roomId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Ensure authentication
          },
          withCredentials: true, 
        });
        setRoom(response.data);
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
      const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    };
    
    const accessToken = getCookie('access_token'); 
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
    // Add new message to list
      setMessage(""); // Clear input field
      console.log(response.data)
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };


  if (loading) return <p>Loading room...</p>;
  if (!room) return <p>Room not found.</p>;
  return (
    <div className="grid grid-cols-4 mt-16 gap-6 px-6">
      {/* Chat Section */}
      <div className="col-span-3 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 relative flex flex-col h-[85vh]">
        {/* Room Info */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{room.name}</h1>
          <p className="text-gray-500">{room.description}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className={`p-3 max-w-[75%] rounded-lg shadow-sm ${msg.user.username === 'Me' ? 'bg-blue-500 text-white ml-auto' : 'bg-white text-gray-800'}`}>
                <p className="text-sm font-semibold">{msg.user.username}</p>
                <p className="text-md">{msg.body}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No messages yet.</p>
          )}
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-4 p-4 border-t mt-4">
          <input
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            value={message}
          />
          <button
            onClick={handlePostMessage}
            className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Send
          </button>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="col-span-1 bg-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200">
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


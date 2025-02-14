'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import ban from '../../public/banner.jpeg'
import Image from 'next/image';


const Politics = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/createroom/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Add token for authentication
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setRoom(data.room); // Save the created room data
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div >
       <Popover>
            <Button variant='yellow'  className="mt-11 hover:bg-yellow-200 text-white">
            <PopoverTrigger>Create Room</PopoverTrigger>
            </Button>
            <PopoverContent>
            <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant='yellow'  className="hover:bg-yellow-200 text-white w-[100%] mt-2">Create Room</Button>
      </form>
            </PopoverContent>
          </Popover>
      {message && <p>{message}</p>}

      {room && (
        <div>
          <h3>Room Created:</h3>
          <p><strong>ID:</strong> {room.id}</p>
          <p><strong>Name:</strong> {room.name}</p>
          <p><strong>Description:</strong> {room.description}</p>
          <p><strong>Host:</strong> {room.host}</p>
        </div>
      )}
    </div>
  );
};

export default Politics;
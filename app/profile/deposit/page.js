'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Deposit of $${amount} via ${paymentMethod} successful!`);
      setAmount('');
    } catch (error) {
      alert('Deposit failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-sm   md:max-w-md mx-auto p-6 bg-yellow-400 text-white rounded-lg shadow-md  mt-40 md:mt-0  ">
      <motion.h2 
        className="text-2xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Deposit Funds
      </motion.h2>
      <label className="block text-sm font-medium mb-2">Amount ($)</label>
      <Input 
        type="number" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        className="w-full px-3 py-2 mb-4 border rounded-md bg-white border-gray-600 focus:border-yellow-300 focus:outline-none"
      />
      <label className="block text-sm font-medium mb-2">Payment Method</label>
      <select
        className="w-full px-3 py-2 mb-4 border rounded-md bg-white border-gray-600 focus:border-yellow-300 focus:outline-none"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="bank">Bank Transfer</option>
        <option value="card">Credit/Debit Card</option>
        <option value="crypto">Cryptocurrency</option>
      </select>
      <Button 
        onClick={handleDeposit} 
        disabled={loading}
        className="w-full bg-yellow-200 hover:bg-yellow-100 text-black py-2 px-4 rounded-md"
      >
        {loading ? 'Processing...' : 'Deposit Now'}
      </Button>
    </div>
  );
}

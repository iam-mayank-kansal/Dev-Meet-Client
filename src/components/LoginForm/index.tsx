"use client"
import { useState } from 'react';
import Link from 'next/link';
import InputWithLabel from '../InputWithLabel';
import { LoginFormData } from '@/lib/constraints';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const LoginForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    email: 'test@gmail.com',
    password: 'Test@123'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sendData = axios.post(
      'http://localhost:8080/api/auth/login',
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    sendData.then((response) => {
      if (response.status === 200 || response.status === 201) {
        alert('Login successful!');
        Router.push('/');
      } else {
        alert('Login failed. Please try again.');
      }
    }).catch((error) => {
      alert(error.response?.data?.message || error.message);
    });
  };

  return (
    <div className="max-w-md mx-auto min-w-[400px] bg-white p-8 rounded-lg shadow-md relative">
      <div className='cursor-pointer bg-red-500 p-2 rounded-[50%] flex justify-center items-center absolute right-4 top-4 z-[200' onClick={() => Router.push('/')}>
        <X className='text-white' />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-5">Log In to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {LoginFormData.map((field, index) => (
          <InputWithLabel
            key={index}
            {...field}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&#39;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
"use client"
import { useState } from 'react';
import Link from 'next/link';
import InputWithLabel from '../InputWithLabel';
import { SignupFormData } from '@/lib/constraints';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';



export const SignupForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: 'abcd',
    email: 'abcd@gmail.com',
    password: 'ABCd@1234',
    confirmPassword: 'ABCd@1234'
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const sendData = axios.post('http://localhost:8080/api/users/create', {...formData,role : 'user'});
    sendData.then((response) => {
      if (response.status === 200 || response.status === 201) {
        alert('Signup successful!');
        router.push('/login');
      } else {
        alert('Signup failed. Please try again.');
      }
    }).catch((error) => {
      alert( error.message);
    });
  };

  return (
    <div className={`max-w-md mx-auto min-w-[400px] bg-white p-8 rounded-lg shadow-md relative`}>
      <div className='cursor-pointer bg-red-500 p-2 rounded-[50%] flex justify-center items-center absolute right-4 top-4 z-[200' onClick={() => router.push('/')}>
        <X className='text-white' />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-5">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {SignupFormData.map((field, index) => (
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
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div >
  );
};
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice';
import { toast } from 'react-toastify';

export default function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill all fields');
      return;
    }


    try {


      const res = await axios.post(`http://localhost:4000/api/v1/auth/login`, form, {
        withCredentials: true,
      });

      console.log("Registration response:", res);

      if (res.status == 200) {
        dispatch(setAuthUser(res.data.user))
        toast.success("user login successfully : ");
        navigate("/")
      }

      setForm({
        email: '',
        password: '',

      });
    } catch (error) {
      console.log("error in login : ", error);
      setError(error.message);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className='flex flex-col gap-2'>
            <h1>Email</h1>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <h1>Password</h1>
            <input
              type="password"
              name="password"
              placeholder="Enter you password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            /></div>

          <button
            type="submit"
            className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-400 "
          >Login
          </button>
        </form>
        <p className="mt-5 text-center text-md text-gray-800">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

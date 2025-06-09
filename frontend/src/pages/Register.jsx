import React, { useState } from 'react';
import axios from 'axios';
import { setAuthUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    readerLevel: 'Beginner',
  });
  const disptach = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log("welcome handles")
    console.log("fomdata  : ", form)

    if (!form.fullName || !form.email || !form.password) {
      setError('Please fill all fields.');
      return;
    }

    try {


      const res = await axios.post(`http://localhost:4000/api/v1/auth/register`, form, {
        withCredentials: true,
      });

      console.log("Registration response:", res);

      if (res.status == 201) {
        dispatch(setAuthUser(res.data.user))
        toast.success("user registered successfullly :");
        navigate("/")
      }

      setForm({
        fullName: '',
        email: '',
        password: '',
        readerLevel: 'Beginner',
      });
    } catch (error) {
      console.log("error in signup : ", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-3">
      <div className="max-w-md w-full bg-white p-8 rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3'>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label htmlFor="readerLevel">Reader Level</label>
            <select
              name="readerLevel"
              id="readerLevel"
              value={form.readerLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-yellow-400 text-black py-2 rounded hover:bg-yellow-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-md text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
}

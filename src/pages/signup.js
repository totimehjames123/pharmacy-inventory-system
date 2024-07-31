import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import DynamicInput from '../Components/DynamicInput';
import NavBar from '@/Components/NavBar';
import SideBar from '@/Components/SideBar';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const notifySuccess = (message) => {
    toast.success(message, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const handleSignup = async () => {
    if (!name || !username || !email) {
      notifyError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup`, {
        name,
        username,
        email,
      });

      if (response.data.status === 200) {
        notifySuccess(response.data.message);
        router.push('/dashboard');
      } else {
        notifyError(response.data.message);
      }
    } catch (error) {
      notifyError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  };

  return (
    <div className='flex max-w-full overflow-hidden max-h-screen'>
      <SideBar />
      <div className='w-full h-screen overflow-scroll'>
        <NavBar toggleThemeMode={toggleThemeMode} isLightMode={isLightMode} title={'Signup'} profilePicture={'/background.jpeg'} username={'John Buamah'} />

        <div className='flex justify-center items-center h-[90%]'>
          <div>
            <ToastContainer
              position='top-left'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='colored'
            />
            <h3 className='text-4xl font-bold text-center'>New Attendant</h3>
            <p className='text-gray-500 text-center'>Fill in to add new Pharmacy Attendant</p>
            <br />
            <DynamicInput
              type='text'
              id='name'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <DynamicInput
              type='text'
              id='username'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DynamicInput
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='my-5 p-4 flex justify-center items-center bg-black transition-all duration-300 hover:bg-gray-900 text-white rounded-lg w-full'
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <div className='flex justify-center items-center'>
                  <FaSpinner className='animate-spin mr-3' /> Please wait ...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

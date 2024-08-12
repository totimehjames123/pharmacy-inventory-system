import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import DynamicInput from '../Components/DynamicInput'; // Adjust the path as needed
import { configDotenv } from 'dotenv';
import checkIsLoggedInAndNavigate from './../../utils/checkIsLoggedInAndNavigate'

function Login() {
  checkIsLoggedInAndNavigate("/dashboard", "/login")

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    if (!username || username.trim().length < 1 || !password) {
      notifyError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        username,
        password,
      });

      if (response.data.status === 200) {
        notifySuccess(response.data.message);

        sessionStorage.setItem('id', response.data.data._id);
        sessionStorage.setItem('name', response.data.data.name);
        sessionStorage.setItem('email', response.data.data.email);
        sessionStorage.setItem('username', response.data.data.username);
        sessionStorage.setItem('role', response.data.data.role);
        
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

  return (
    <div className='grid lg:grid-cols-2 h-screen'>
      <div className='h-screen'>
        <h4 className='text-blue-500 text-2xl p-5 font-bold'>
          Epha<span className='text-black'>Medicals</span>
        </h4>
        <div className='h-[85%] flex items-center justify-center p-4'>
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
            <h3 className='text-5xl font-bold'>Welcome back!</h3>
            <p className='text-gray-500'>Kindly provide your login information to proceed</p>
            <div className='my-5'>
              <label htmlFor='username'>Username</label>
              <br />
              <DynamicInput
                type='text'
                id='username'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <br />
              <DynamicInput
                type='password'
                id='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className='my-5 p-4 flex justify-center items-center bg-black transition-all duration-300 hover:bg-gray-900 text-white rounded-lg w-full'
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <div className='flex justify-center items-center'><FaSpinner className='animate-spin mr-3'/>Please wait ...</div>
              ) : (
                'Login'
              )}
            </button>
            <p className='text-center'>{<Link href={'/forgot-password'} className='text-blue-500'>Forgot your password</Link>}</p>
          </div>
        </div>
      </div>
      <div className='hidden lg:block h-screen p-2 sm:hidden'>
        <Image
          src='/background.avif'
          alt='background-picture'
          className='w-full h-[100%] rounded-lg bg-cover bg-no-repeat'
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

export default Login;

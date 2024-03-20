import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const notifySuccess = (message) => {
        toast.success(message, {
        position: "top-left",
        autoClose: 50000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    };

    const notifyError = (message) => {
        toast.error(message , {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

  const handleLogin = async () => {
    // Validate data
    if (!username || !password) {
        notifyError("All fields are required")
      
      return;
    }

    try {
      // Perform login API call using Axios
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password, 
      });

      if (response.data.status === 200){
        notifySuccess(response.data.message)
        console.log(response.data.message)
        if (username === "admin123"){
          sessionStorage.setItem('username', "admin123")
        }
        else{
          sessionStorage.setItem('username', "attendant001")
        }
        
        router.push('/dashboard')
      }
      else{
        notifyError(response.data.message)
      }

    } catch (error) {
      notifyError(error.message)
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
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
            <h3 className='text-5xl font-bold'>Welcome back!</h3>
            <p>Kindly provide your login information to proceed</p>
            <div className='my-5'>
              <label htmlFor='username'>Username</label>
              <br />
              <input
                type='text'
                id='username'
                className='border p-4 rounded-lg mt-2 w-full'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className=''>
              <label htmlFor='password'>Password</label>
              <br />
              <input
                type='password'
                id='password'
                className='border p-4 rounded-lg mt-2 w-full'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              className='my-5 p-4 bg-black transition-all duration-300 hover:bg-gray-900 text-white rounded-lg w-full'
              onClick={handleLogin}
            >
              Login
            </button>
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

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FaSpinner } from 'react-icons/fa';
import DynamicInput from '../Components/DynamicInput'; // Adjust the path as needed
import Image from 'next/image';
import Link from 'next/link';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSentMessage, setIsSentMessage] = useState(false)

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

  const handleForgotPassword = async () => {
    if (!email || email.trim().length < 1) {
      notifyError('Email is required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/forgot-password`, {
        email,
      });

      if (response.data.status === 200) {
        notifySuccess(response.data.message);
        setIsSentMessage(true)
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
            <h3 className='text-3xl font-bold'>Forgot Password</h3>
            <p className='text-gray-500'>{!isSentMessage ? "Enter your email to reset your password" : <p>A 6 digit verification code has been sent to your email,<br /> if you've not recieved it, kindly re-submit your email <br /> otherwise  click the link below to proceed."</p>}</p>
            <div className='my-5'>
              <label htmlFor='email'>Email</label>
              <br />
              <DynamicInput
                type='email'
                id='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p>Already recieved code ? &nbsp; {<Link href={'/reset-password'} className='text-blue-500'>Continue to reset password</Link>}</p>
            <button
              className='my-5 p-4 flex justify-center items-center bg-black transition-all duration-300 hover:bg-gray-900 text-white rounded-lg w-full'
              onClick={handleForgotPassword}
              disabled={loading}
            >
              {loading ? (
                <div className='flex justify-center items-center'>
                  <FaSpinner className='animate-spin mr-3' /> Please wait ...
                </div>
              ) : (
                'Submit'
              )}
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

export default ForgotPassword;

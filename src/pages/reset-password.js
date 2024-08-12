import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';
import DynamicInput from '../Components/DynamicInput'; // Adjust the path as needed
import Image from 'next/image';
import { useRouter } from 'next/router';

function ResetPassword() {
  const router = useRouter()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleResetPassword = async () => {
    if (!username || !email || !verificationCode || !newPassword || !confirmPassword) {
      notifyError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password`, {
        username,
        email,
        verificationCode,
        newPassword,
      });

      if (response.data.status === 200) {
        notifySuccess(response.data.message);
        router.push("/login")
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
    <div className='relative min-h-screen   bg-gray-100'>
    <div className='p-5 text-center'>
        <h4 className='text-blue-500 text-2xl font-bold'>
          Epha<span className='text-black'>Medicals</span>
        </h4>
      </div>
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8'>
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
        <h3 className='text-3xl font-bold text-center mb-4'>Reset Password</h3>
        <p className='text-gray-500 text-center mb-4'>Enter the verification code sent to your email</p>
        <div className=''>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
            <DynamicInput
              type='text'
              id='username'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
            <DynamicInput
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='verificationCode' className='block text-gray-700 text-sm font-bold mb-2'>Verification Code</label>
            <DynamicInput
              type='text'
              id='verificationCode'
              placeholder='Enter the verification code'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='newPassword' className='block text-gray-700 text-sm font-bold mb-2'>New Password</label>
            <DynamicInput
              type='password'
              id='newPassword'
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
            <DynamicInput
              type='password'
              id='confirmPassword'
              placeholder='Confirm your new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className='my-5 p-4 flex justify-center items-center bg-black transition-all duration-300 hover:bg-gray-900 text-white rounded-lg w-full'
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <div className='flex justify-center items-center'>
              <FaSpinner className='animate-spin mr-3' /> Please wait ...
            </div>
          ) : (
            'Reset Password'
          )}
        </button>
      </div>
      
    </div>
    </div>
  );
}

export default ResetPassword;

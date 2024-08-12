import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';
import DynamicInput from '../Components/DynamicInput'; // Adjust the path as needed
import checkIsLoggedInAndNavigate from '../../utils/checkIsLoggedInAndNavigate';

function ChangePassword() {
  checkIsLoggedInAndNavigate("/update-password", "/login")

  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = window?.sessionStorage?.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

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

  const handleChangePassword = async () => {
    if (!username || !currentPassword || !newPassword || !confirmPassword) {
      notifyError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      notifyError('New password and confirm password do not match');
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/change-password`, {
          username,
          currentPassword,
          newPassword,
          confirmPassword,
        });
  
        if (response.status === 200) {
          notifySuccess(response.data.message);
          sessionStorage.clear("")
          // Optionally, you can redirect the user after a successful password change
          router.push('/login');
        } else {
          notifyError(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          notifyError(error.response.data.message);
        } 
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className='relative min-h-screen bg-gray-100'>
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
          <h3 className='text-3xl font-bold text-center mb-4'>Change Password</h3>
          <p className='text-gray-500 text-center mb-4'>Please provide your details to change your password</p>
          <div className=''>
            <div className='mb-4'>
              <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
              <DynamicInput
                type='text'
                id='username'
                placeholder='Enter your username'
                value={username}
                
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='currentPassword' className='block text-gray-700 text-sm font-bold mb-2'>Current Password</label>
              <DynamicInput
                type='password'
                id='currentPassword'
                placeholder='Enter your current password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
              <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-bold mb-2'>Confirm New Password</label>
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
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <div className='flex justify-center items-center'>
                <FaSpinner className='animate-spin mr-3' /> Please wait ...
              </div>
            ) : (
              'Change Password'
            )}
          </button>
          <p className='text-center'>{<Link href={'/login'} className='text-blue-500'>Go back</Link>}</p>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

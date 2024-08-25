import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-toastify';

function ProfileModal({ closeModal }) {
  const router = useRouter()
  const notifyLogout = () => {
    sessionStorage.clear();
    toast.success("You've logged out successfully!");
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 z-50 w-full bg-black bg-opacity-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-md p-6 mx-auto my-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <button
            className="text-gray-500 cursor-pointer"
            onClick={closeModal}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src='/logo.jpg'
              className='rounded-full shadow-sm border'
              alt='user'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <h3 className='font-bold' style={{lineHeight: 1}}>{sessionStorage.getItem('name')}</h3>
          <p className='text-xs text-gray-500'>@{sessionStorage.getItem("username")}</p> <br />
          <p className='font-light text-sm mb-4 text-gray-500'>I am a {sessionStorage.getItem('role') === "admin" ? "Shop Owner (C.E.O of Epha Medicals)" : "Pharmacy Attendant"} at Epha Medicals • I am a {sessionStorage.getItem("role")} • Email: {sessionStorage.getItem("email")}</p> <br />
          <a href={'/update-password'} className="bg-black mr-2 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition duration-300">
            Change Password
          </a>
          <button  onClick={notifyLogout} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal;

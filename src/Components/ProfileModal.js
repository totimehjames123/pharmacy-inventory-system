import Image from 'next/image'
import React from 'react'

function ProfileModal({ closeModal }) {
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
              src='/background.jpeg'
              className='rounded-full shadow-lg'
              alt='user'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <h3 className='font-bold'>{sessionStorage.getItem('name')}</h3>
          <p className='text-xs'>@{sessionStorage.getItem("username")}</p>
          <p className='font-light text-sm mb-4'>{sessionStorage.getItem('role') === "admin" ? "Shop Owner (C.E.O of Epha Medicals)" : "Pharmacy Attendant"} • {sessionStorage.getItem("email")} • {sessionStorage.getItem("role")}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
            Change Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal;

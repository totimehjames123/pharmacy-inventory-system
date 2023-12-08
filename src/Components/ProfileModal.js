import React from 'react'

function ProfileModal({closeModal}) {
  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md p-4 mx-auto my-6 transition-all transform bg-white rounded-md shadow-lg">
            <div className="flex items-start justify-between mb-4 ">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <button
                className="text-gray-500 cursor-pointer"
                onClick={() => closeModal()}
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
            
            <div className='text-center'>
                <img src='background.jpeg' className='m-auto rounded-lg w-[300px] h-[180px] shadow-lg' alt='user'/> 
                <h3 className=' text-[30px] mx-7'>{sessionStorage.getItem('username')} </h3>
                <p className='font-100 text-sm mx-7'>Pharmacy Attendant</p>           
            </div>
          </div>
        </div>
  )
}

export default ProfileModal
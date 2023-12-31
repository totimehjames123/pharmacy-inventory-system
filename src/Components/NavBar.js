import React, { useEffect, useState } from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'
import ProfileModal from './ProfileModal'

function NavBar({title, profilePicture, toggleThemeMode, isLightMode}) {

  const [isModalOpen, setModalOpen] = useState(false)


  return (
    <nav className={`flex justify-between p-3 h-15 items-center ${ !isLightMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {isModalOpen && <ProfileModal closeModal={() => setModalOpen(false)}/>}
        <div className={"text-lg font-bold lg:font-thin lg:text-4xl"}>
          {title}
        </div>
        <div className='flex items-center'>
            <button className={`p-2 rounded-full m-5 text-white ${isLightMode ? ' bg-black  hover:bg-blue-500' : 'bg-blue-500  hover:bg-black'} transition-all duration-500`} onClick={() => toggleThemeMode()}>
              {isLightMode ? <FaMoon size={15} /> : <FaSun size={15}/>}
            </button> 
          <img onClick={() => setModalOpen(true)} className='rounded-full w-10 h-10 lg:mr-5' src={profilePicture} />
        </div>
    </nav>
  )
}

export default NavBar

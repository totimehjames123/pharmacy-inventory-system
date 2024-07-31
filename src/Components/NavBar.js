import React, {useState } from 'react'
import {FaMoon, FaSun} from 'react-icons/fa'
import ProfileModal from './ProfileModal'
import Image from 'next/image'


function NavBar({title, profilePicture}) {

  const [isModalOpen, setModalOpen] = useState(false)


  return (
    <nav className={`flex justify-between bg-gray-50 p-3 h-15 items-center`}>
      {isModalOpen && <ProfileModal closeModal={() => setModalOpen(false)}/>}
        <div className={"text-lg font-bold lg:font-thin lg:text-4xl"}>
          {title}
        </div>
        <div className='flex items-center'>
            
            <Image onClick={() => setModalOpen(true)} alt='profilepicture' className='rounded-full w-10 h-10 lg:mr-5' src={profilePicture} width={200} height={200}/>   
        </div>
    </nav>
  )
}

export default NavBar

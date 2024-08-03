import NavBar from '@/Components/NavBar'
import SalesListTable from '@/Components/SalesListTable'
import SideBar from '@/Components/SideBar'
import React, { useState } from 'react'
import checkIsLoggedInAndNavigate from './../../utils/checkIsLoggedInAndNavigate'


function Sales() {
  checkIsLoggedInAndNavigate ("/sales", "/login")

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }

  return (
    <div className={`flex max-w-full bg-gray-50 overflow-hidden max-h-screen`}>
          <SideBar />
        <div className='w-full overflow-x-hidden overflow-auto max-h-screen'>
          <NavBar isLightMode={isLightMode} toggleThemeMode={toggleThemeMode} title={'Sales Made'} profilePicture={'/background.jpeg'} alt='imagess' username={'John Buamah'} />
          <SalesListTable isLightMode={isLightMode} />
        </div>
    </div>
    
  )
}

export default Sales
import NavBar from '@/Components/NavBar'
import SideBar from '@/Components/SideBar'
import StockListTable from '@/Components/StockListTable'
import React, { useState } from 'react'
import checkIsLoggedInAndNavigate from './../../utils/checkIsLoggedInAndNavigate'


function Stocks() {
  checkIsLoggedInAndNavigate ("/stocks", "/login")


  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }


  return (
    <div className='flex bg-gray-50 max-w-full overflow-hidden max-h-screen'>
        <SideBar />
        <div className='w-full overflow-auto overflow-x-hidden max-h-screen'>
          <NavBar isLightMode={isLightMode} toggleThemeMode={toggleThemeMode} title={'Medicines Stock'} profilePicture={'/background.jpeg'} alt='background-image' username={'John Buamah'}/>
          <StockListTable />
        </div>
    </div>
  )
}

export default Stocks
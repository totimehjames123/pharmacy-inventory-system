import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import StockListTable from '@/components/StockListTable'
import React, { useState } from 'react'

function Stocks() {

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }


  return (
    <div className='flex max-w-full overflow-hidden max-h-screen'>
        <SideBar />
        <div className='w-full overflow-auto'>
          <NavBar isLightMode={isLightMode} toggleThemeMode={toggleThemeMode} title={'Medicines Stock'} profilePicture={'/background.jpeg'} alt='background-image' username={'John Buamah'}/>
          <StockListTable />
        </div>
    </div>
  )
}

export default Stocks
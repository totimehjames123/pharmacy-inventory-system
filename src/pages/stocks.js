import NavBar from '@/Components/NavBar'
import SideBar from '@/Components/SideBar'
import StockListTable from '@/Components/StockListTable'
import React, { useState } from 'react'

function Stocks() {

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }


  return (
    <div className='flex max-w-full overflow-hidden max-h-screen'>
        <SideBar />
        <div className='max-w-full overflow-x-hidden overflow-auto max-h-screen'>
          <NavBar isLightMode={isLightMode} toggleThemeMode={toggleThemeMode} title={'Medicines Stock'} profilePicture={'/background.jpeg'} alt='background-image' username={'John Buamah'}/>
          <StockListTable />
        </div>
    </div>
  )
}

export default Stocks
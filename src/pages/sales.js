import NavBar from '@/Components/NavBar'
import SalesListTable from '@/Components/SalesListTable'
import SideBar from '@/Components/SideBar'
import React, { useState } from 'react'

function Sales() {

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }

  return (
    <div className={`flex max-w-full overflow-hidden max-h-screen`}>
          <SideBar />
        <div className='max-w-full overflow-x-hidden overflow-auto max-h-screen'>
          <NavBar isLightMode={isLightMode} toggleThemeMode={toggleThemeMode} title={'Medicine Sales'} profilePicture={'/background.jpeg'} alt='imagess' username={'John Buamah'} />
          <SalesListTable isLightMode={isLightMode} />
        </div>
    </div>
    
  )
}

export default Sales
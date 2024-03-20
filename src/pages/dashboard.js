import DataCard from '@/Components/DataCard'
import NavBar from '@/Components/NavBar'
import SideBar from '@/Components/SideBar'
import React, { useState } from 'react'
import { FaMoneyBill, FaSortNumericDown, FaUser } from 'react-icons/fa'
import { FaKitMedical, FaMoneyBillTransfer, FaUserCheck, FaUserDoctor, FaUserGroup } from 'react-icons/fa6'

function dashboard() {

  const [isLightMode, setIsLightMode] = useState(true);

  const toggleThemeMode = () => {
    setIsLightMode(!isLightMode)
  }


  return (
    <div className='flex max-w-full overflow-hidden max-h-screen'>
        <SideBar />
        <div className='w-full h-screen overflow-scroll'>
          <NavBar toggleThemeMode={toggleThemeMode} isLightMode={isLightMode} title={'DashBoard'} profilePicture={'/background.jpeg'}  username={'John Buamah'}/>
          
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3'>
                <DataCard background={'bg-gray-500'} title={'Total Users'} time={'Now'} number={'2'} icon={<FaUser size={50} color='gray'/>}/>             
                <DataCard background={'bg-red-300'} title={'Total Medicines'} time={'Up from yesterday'} number={'3'} icon={<FaKitMedical size={50} color='pink'/>}/>             
                <DataCard background={'bg-green-500'} title={'Sales Made'} time={'Up from yesterday'} number={'3'} icon={<FaSortNumericDown size={50} color='green'/>}/>             
                <DataCard background={'bg-white-500'} title={'Overall amount (GHC)'} time={'Up from yesterday'} number={'30'} icon={<FaMoneyBill size={50} color='gray'/>}/>             
                <DataCard background={'bg-indigo-500'} title={'Total Admins'} time={'Today'} number={'1'} icon={<FaUserCheck size={50} color='indigo'/>}/>             
                <DataCard background={'bg-yellow-500'} title={'Pharmacy attendants'} time={'Up from yesterday'} number={'1'} icon={<FaUserDoctor size={50} color='yellow'/>}/>             
                <DataCard background={'bg-blue-500'} title={'Top Users'} time={'Up from yesterday'} number={'2'} icon={<FaUserGroup size={50} color='blue'/>}/>             
                <DataCard background={'bg-orange-200'} title={'Highest Purchase'} time={'Up from yesterday'} number={'10'} icon={<FaMoneyBillTransfer size={50} color='orange'/>}/>             
          </div>
        </div>
    </div>
  )
}

export default dashboard
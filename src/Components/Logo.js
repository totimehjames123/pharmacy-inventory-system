import React from 'react'

function Logo({align}) {
  return (
    <div className={`text-blue-500 text-2xl p-5 ${align} font-bold`}>
          Epha<span className='text-black'>Medicals</span>
    </div>
 )
}

export default Logo
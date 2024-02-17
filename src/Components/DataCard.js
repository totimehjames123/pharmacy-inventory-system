import React from 'react'

function DataCard({background, title, number, icon, time}) {

  return (
    <div className='p-2 h-[40vh]'>
      <div className={`h-full border ${background} shadow-lg p-2 rounded-md`}>
          <div className='flex justify-between'>
            <span className='font-bold text-gray-700'>{title}</span>
            <button>+</button>
          </div>
          <div className='flex justify-around items-center px-4 h-[80%]'>
            <span className='text-[60px] text-gray-700'>{number}</span>
            <button>{icon}</button>
          </div>
          <div className='flex justify-end'>
            <span className='text-[11px] font-bold text-gray-700'>{time}</span>
          </div>
      </div>
    
    </div>
  )
}

export default DataCard
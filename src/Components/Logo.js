import Image from 'next/image'
import React from 'react'

function Logo({align}) {
  return (
    <Image
        src="/logo.png"
        alt="Logo"
        width={200} // Adjust width and height as needed
        height={200}
      />
 )
}

export default Logo
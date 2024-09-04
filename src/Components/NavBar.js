import React, { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import Image from 'next/image';
import checkIsAdmin from './../../utils/checkIsAdmin.js';

function NavBar({ title, profilePicture }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const isAdmin = checkIsAdmin();

  useEffect(() => {
    const currentHour = new Date().getHours();
    let timeOfDayGreeting = '';

    if (currentHour < 12) {
      timeOfDayGreeting = 'Good morning';
    } else if (currentHour < 18) {
      timeOfDayGreeting = 'Good afternoon';
    } else {
      timeOfDayGreeting = 'Good evening';
    }

    const roleGreeting = isAdmin ? 'Admin' : 'Pharmacist';
    setGreeting(`${timeOfDayGreeting}, ${roleGreeting}`);
  }, [isAdmin]);

  return (
    <nav className="flex justify-between bg-gray-50 p-3 h-15 items-center">
      {isModalOpen && <ProfileModal closeModal={() => setModalOpen(false)} />}
        <div className="text-lg font-bold lg:font-thin lg:text-4xl">
          <div>{title}</div>
          {title == "Dashboard" && greeting && <p className="text-sm text-gray-500 font-thin">{greeting}</p>}
        </div>

      <div className="flex items-center">
        <Image
          onClick={() => setModalOpen(true)}
          alt="profile picture"
          className="rounded-full w-10 h-10 lg:mr-5"
          src={profilePicture}
          width={200}
          height={200}
        />
      </div>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { MdNotifications, MdPerson } from 'react-icons/md';

const Navbar = () => {
  
  return (
    <div className="flex justify-end items-center px-5 py-7 bg-white border-b-2 h-20 border-gray-200">
        <div className="flex">
            <MdNotifications className="text-2xl mr-4 cursor-pointer" />
            <div className="cursor-pointer">
            {<MdPerson size={24}/>}
            </div>
        </div>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('fh_user')
    router.replace('/login');
  };

  return (
    <button
      className="flex items-center px-4 w-full text-left cursor-pointer"
      onClick={handleLogout}
    >
      <MdExitToApp className="mr-2 cursor-pointer" /> Logout
    </button>
  );
};

export default LogoutButton;

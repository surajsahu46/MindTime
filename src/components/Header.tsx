import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between h-16 px-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome to MindTime
        </h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <BellIcon className="w-6 h-6" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <UserCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Make sure the path to AuthContext is correct

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Access the user data and logout function

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout(); // Call the logout function from AuthContext
  };

  return (
    <div className="relative">
      <img
        id="avatarButton"
        type="button"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer"
        src="https://via.placeholder.com/150"
        alt="User dropdown"
      />

      {isOpen && (
        <div
          id="userDropdown"
          className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            {/* Use the user data */}
            <div>{user?.first_name} {user?.last_name}</div>
            <div className="font-medium truncate">{user?.email}</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Privacy Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Tax forms
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a 
              href="#" 
              onClick={handleLogout} // Handle logout when clicked
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;

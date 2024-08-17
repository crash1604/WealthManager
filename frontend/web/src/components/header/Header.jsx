import React from 'react';
import User from '../user/User';
import Notification from '../notification/Notification';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-semibold">Dashboard</h2>
    <div className="flex items-center space-x-4">
        <Notification />
        <User />
      </div>
  </header>
  );
}

export default Header;

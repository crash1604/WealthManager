import React from 'react';

const Sidebar = ({ onMenuSelect }) => {

  const menuOptions = [
    { name: 'Overview', value: 'overview' },
    { name: 'Portfolio Management', value: 'portfolio-management' },
    { name: 'Investments', value: 'investments' },
    { name: 'Analytics & Reports', value: 'analytics' },
    { name: 'Investment Strategies', value: 'strategies' },
    { name: 'Support', value: 'support' },
  ];

  return (
    <div className="w-64 bg-gray-800 p-6">
      <h1 className="text-white text-3xl font-semibold">Portfolio Manager</h1>
      <nav className="mt-6">
        {menuOptions.map((option) => (
          <button
            key={option.value}
            className="block text-gray-300 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white w-full text-left"
            onClick={() => onMenuSelect(option.value)}
          >
            {option.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

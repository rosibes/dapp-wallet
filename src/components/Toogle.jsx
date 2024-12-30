// src/components/Toggle.jsx
import { FaSun, FaMoon } from 'react-icons/fa'; // Importăm iconurile pentru soare și lună
import { useState } from 'react';

const Toggle = ({ darkMode, setDarkMode }) => {
  return (
    <div > {/* className="absolute top-4 right-10" */}
      {/* Buton cu iconuri pentru Day/Night Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg"
      >
        {darkMode ? (
          <FaSun className="w-8 h-8 text-yellow-400 transform transition-all duration-300 hover:scale-105 
          hover:shadow-xl hover:opacity-90 rounded-lg" />  // Iconul pentru Day Mode (Soare)
        ) : (
          <FaMoon className="w-8 h-8 text-gray-800 transform transition-all duration-300 hover:scale-105 
          hover:shadow-xl hover:opacity-90 rounded-lg" />  // Iconul pentru Night Mode (Lună)
        )}
      </button>
    </div>
  );
};

export default Toggle;

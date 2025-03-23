import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import userContext from '../context/user/userContext';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { id, logout } = useContext(userContext);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-900 text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-blue-500 transition-colors">Stumeet</Link>
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-gray-700 hover:text-blue-500 transition-colors">Home</Link>
          {id ? (
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-gray-700"><FaUserCircle className="mr-2" /> {id.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

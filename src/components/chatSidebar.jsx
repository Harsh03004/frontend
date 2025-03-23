import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChatSidebar = ({ users = [], setSelectedUser }) => {
  return (
    <motion.div 
      initial={{ x: -200, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 py-8 px-4 flex flex-col shadow-lg overflow-y-auto"
    >
      <div className="text-3xl font-bold text-center mb-8 ">
      <Link to="/" className="hover:text-green-400 transition-colors">Stumeet</Link>
      </div>
      <div className="text-2xl   mb-8  ">
      <Link to="/home" className="flex items-center  px-4 rounded-lg">Home</Link>
      </div>
      <nav className="flex flex-col space-y-2">
        {users.length > 0 ? (
          users.map((user) => (
            <button 
              key={user._id} 
              onClick={() => setSelectedUser(user)}
              className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-transform duration-200 hover:bg-green-500 hover:scale-105"
            >
              <span className="text-lg">{user.username}</span>
            </button>
          ))
        ) : (
          <span className="text-gray-400">No users available</span>
        )}
      </nav>
    </motion.div>
  );
};

export default ChatSidebar;
// import { Link } from 'react-router-dom';
// import React from 'react';
// import { motion } from 'framer-motion';

// const Sidebar = () => {
//   return (
//     <motion.div 
//       initial={{ x: -200, opacity: 0 }} 
//       animate={{ x: 0, opacity: 1 }} 
//       transition={{ duration: 0.5 }}
//       className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 py-8 px-4 flex flex-col shadow-lg"
//     >
//       <div className="text-3xl font-bold text-center mb-8">
//         <Link to="/" className="hover:text-green-400 transition-colors">Stumeet</Link>
//       </div>
//       <nav className="flex flex-col space-y-2">
//         {['Chat', 'Instant Meet', 'Profile', 'Organisations'].map((item) => (
//           <Link 
//             key={item} 
//             to={`/${item.toLowerCase().replace(' ', '-')}`} 
//             className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-transform duration-200 hover:bg-green-500 hover:scale-105"
//           >
//             <span className="text-lg">{item}</span>
//           </Link>
//         ))}
//       </nav>
//     </motion.div>
//   );
// };

// export default Sidebar;



import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ setActivePage }) => {
  return (
    <motion.div 
      initial={{ x: -200, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 py-8 px-4 flex flex-col shadow-lg"
    >
      <div className="text-3xl font-bold text-center mb-8">
        <Link to="/" className="hover:text-green-400 transition-colors">Stumeet</Link>
      </div>
      <nav className="flex flex-col space-y-2">
        {['Chat', 'Instant Meet', 'Profile', 'Organisations'].map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item.toLowerCase())} // Normalize to lowercase
            className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-transform duration-200 hover:bg-green-500 hover:scale-105 text-left"
          >
            <span className="text-lg">{item}</span>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
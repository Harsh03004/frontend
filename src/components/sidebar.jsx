// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';

// import { MessageCircle, Video, User, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

// const menuItems = [
//   { name: 'Chat', icon: <MessageCircle size={18} /> },
//   { name: 'Instant Meet', icon: <Video size={18} /> },
//   { name: 'Profile', icon: <User size={18} /> },
//   { name: 'Organisations', icon: <Building2 size={18} /> },
// ];

// const Sidebar = ({ setActivePage }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className={`custom-sidebar ${collapsed ? 'collapsed' : ''}`}>
//       <div className="toggle-btn-container">
//         <button
//           className="toggle-btn"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>

//       <nav className="nav-menu">
//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => setActivePage(item.name.toLowerCase())}
//             className="menu-item"
//           >
//             {item.icon}
//             {!collapsed && <span>{item.name}</span>}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import { MessageCircle, Video, User, Building2, ChevronLeft, ChevronRight } from "lucide-react";

// const menuItems = [
//   { name: "Chat", icon: <MessageCircle size={18} /> },
//   { name: "Instant Meet", icon: <Video size={18} /> },
//   { name: "Profile", icon: <User size={18} /> },
//   { name: "Organisations", icon: <Building2 size={18} /> },
// ];

// const Sidebar = ({ setActivePage }) => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div
//       className={`fixed top-16 h-[calc(100vh-4rem)] bg-base-300 shadow-lg ${
//         collapsed ? "w-16" : "w-64"
//       } transition-all duration-300`}
//     >
//       {/* Toggle Button */}
//       <div className="flex justify-end p-2">
//         <button
//           className="bg-base-content text-base-200 p-2 rounded-full hover:scale-105 transition-transform"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//         </button>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="mt-4 space-y-2">
//         {menuItems.map((item) => (
//           <button
//             key={item.name}
//             onClick={() => setActivePage(item.name.toLowerCase())}
//             className={`flex items-center gap-4 w-full px-4 py-3 text-sm font-medium text-base-content hover:bg-base-200 rounded-lg transition-all ${
//               collapsed ? "justify-center" : ""
//             }`}
//           >
//             {item.icon}
//             {!collapsed && <span>{item.name}</span>}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import { MessageCircle, Video, User, Building2, ChevronLeft, ChevronRight,Mail } from "lucide-react";

const menuItems = [
  { name: "Instant Meet", icon: <Video size={18} /> },
  { name: "Profile", icon: <User size={18} /> },
  { name: "Organisation", icon: <Building2 size={18} /> },
  { name: "Invites", icon: <Mail size={18} /> },
];

const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    // <div
    //   className={`fixed top-16 h-[calc(100vh-4rem)] bg-base-300 shadow-lg transition-all duration-300 ${
    //     collapsed ? "w-16" : "w-64"
    //   }`}
    // >
    <div>
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          className="bg-base-content text-base-200 p-2 rounded-full hover:scale-105 transition-transform"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name.toLowerCase())}
            className={`flex items-center gap-4 w-full px-4 py-3 text-sm font-medium text-base-content hover:bg-base-200 rounded-lg transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
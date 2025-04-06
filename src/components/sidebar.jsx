import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles/Sidebar.css';
import { MessageCircle, Video, User, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

const menuItems = [
  { name: 'Chat', icon: <MessageCircle size={18} /> },
  { name: 'Instant Meet', icon: <Video size={18} /> },
  { name: 'Profile', icon: <User size={18} /> },
  { name: 'Organisations', icon: <Building2 size={18} /> },
];

const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`custom-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="toggle-btn-container">
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name.toLowerCase())}
            className="menu-item"
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Video, User, Building2, ChevronLeft, ChevronRight, Mail } from "lucide-react";

const menuItems = [
  { name: "Instant Meet", icon: <Video size={18} /> },
  { name: "Profile", icon: <User size={18} /> },
  { name: "Organisation", icon: <Building2 size={18} /> },
  { name: "Invites", icon: <Mail size={18} /> },
];

const Sidebar = ({ setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = (itemName) => {
    if (itemName === "Instant Meet") {
      navigate(`/room?room=${Math.floor(10000 + Math.random() * 90000)}`);
    } else {
      setActivePage(itemName.toLowerCase());
    }
  };

  return (
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
            onClick={() => handleClick(item.name)}
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

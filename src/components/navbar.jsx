import { Link } from 'react-router-dom';
import React, { useContext } from "react";
import userContext from '../context/user/userContext';
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  const { id, logout } = useContext(userContext);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="brand">
          Stumeet
        </Link>

        {/* Right-aligned user section */}
        <div className="nav-right">
          {id ? (
            <>
              <span className="user-icon">
                <FaUserCircle /> {id.username}
              </span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="logout-btn login-btn"
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

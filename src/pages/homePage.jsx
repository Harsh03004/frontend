

// pages/HomeLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
// import Navbar from "../components/navbar";

function HomeLayout() {
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    navigate(`/home/${page.toLowerCase()}`);
  };

  return (
    <>
    {/* <Navbar /> */}
    <div className="flex">
      <Sidebar setActivePage={handlePageChange} />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
    </>
  );
}

export default HomeLayout;

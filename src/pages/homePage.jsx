// import React, { useState } from "react";
// import Sidebar from "../components/sidebar";
// import Profile from "./Profile";
// import Chat from "../components/chat";
// import Organisation from "../components/organisation";

// function HomePage() {
//   const [activePage, setActivePage] = useState("profile");
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const handlePageChange = (page) => {
//     setActivePage(page.toLowerCase());
//     if (page.toLowerCase() === "organisations") {
//       setShouldFetch(true); // Trigger fetch when "Organisations" is clicked
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar setActivePage={handlePageChange} />
//       <div className="w-full">
//         {activePage === "organisations" ? (
//           <Organisation setShouldFetch={setShouldFetch} shouldFetch={shouldFetch} />
//         ) : activePage === "profile" ? (
//           <Profile />
//         ) : activePage === "chat" ? (
//           <Chat />
//         ) : (
//           <h1 className="text-2xl font-bold capitalize">{activePage} Page</h1>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;



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

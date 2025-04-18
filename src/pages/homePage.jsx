import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Profile from "./Profile";
import Chat from "../components/chat";
import Organisation from "../components/organisation";

function HomePage() {
  const [activePage, setActivePage] = useState("profile");
  const [shouldFetch, setShouldFetch] = useState(false);

  const handlePageChange = (page) => {
    setActivePage(page.toLowerCase());
    if (page.toLowerCase() === "organisations") {
      setShouldFetch(true); // Trigger fetch when "Organisations" is clicked
    }
  };

  return (
    <div className="flex">
      <Sidebar setActivePage={handlePageChange} />
      <div className="w-full">
        {activePage === "organisations" ? (
          <Organisation setShouldFetch={setShouldFetch} shouldFetch={shouldFetch} />
        ) : activePage === "profile" ? (
          <Profile />
        ) : activePage === "chat" ? (
          <Chat />
        ) : (
          <h1 className="text-2xl font-bold capitalize">{activePage} Page</h1>
        )}
      </div>
    </div>
  );
}

export default HomePage;
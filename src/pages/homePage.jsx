import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Profile from './Profile'; // Import the Profile component
import Chat from '../components/chat'; // Import the Chat component 
import Organisation from '../components/organisation';
function HomePage() {
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />
      <div className="w-full">
        {activePage === 'organisations' ? (
         <Organisation />
        ) : activePage === 'profile' ? (
          <Profile /> // Render the Profile component when activePage is 'profile'
        ) : activePage === 'chat' ? (
          <Chat /> // Render the Chat component when activePage is 'chat'
        ) :(
          <h1 className="text-2xl font-bold capitalize">{activePage} Page</h1>
        )}
      </div>
    </div>
  );
}

export default HomePage;
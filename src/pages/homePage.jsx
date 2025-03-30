import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Profile from './Profile'; // Import the Profile component
import Chat from '../components/chat'; // Import the Chat component 
import Organisation from '../components/organisation';
function HomePage() {
  const [activePage, setActivePage] = useState('home');

  const organisations = [
    { id: 1, name: 'Organisation 1', description: 'Description for Organisation 1' },
    { id: 2, name: 'Organisation 2', description: 'Description for Organisation 2' },
    { id: 3, name: 'Organisation 3', description: 'Description for Organisation 3' },
    { id: 4, name: 'Organisation 4', description: 'Description for Organisation 4' },
  ];

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
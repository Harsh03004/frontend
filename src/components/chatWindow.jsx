import React, { useState } from 'react';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me', // You can change this to the actual sender's ID or name
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-2xl text-gray-500">Select a user to start chatting</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">{selectedUser.username}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              <p>{message.text}</p>
              <span className="text-xs text-gray-600">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="w-full p-2 border rounded mb-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button 
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
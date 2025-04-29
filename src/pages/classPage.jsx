import React, { useState, useRef, useEffect } from 'react';

const ClassPage = () => {
  const [members, setMembers] = useState(['Alice', 'Bob']);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInvite = (e) => {
    e.preventDefault();
    if (inviteName.trim()) {
      setMembers([...members, inviteName.trim()]);
      setInviteName('');
      setShowInviteForm(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setMessages([...messages, chatInput.trim()]);
      setChatInput('');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-base-100 text-base-content">
      {/* Chat Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <h1 className="text-2xl font-bold">Class Chat</h1>
          <button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="btn btn-primary"
          >
            {showInviteForm ? 'Close' : 'Invite Member'}
          </button>
        </div>

        {/* Invite Member Form */}
        {showInviteForm && (
          <form onSubmit={handleInvite} className="p-4 border-b border-base-300 bg-base-200 flex gap-4">
            <input
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Enter member name"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-success">
              Invite
            </button>
          </form>
        )}

        {/* Messages List + Input */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-bubble">{msg}</div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-base-300 bg-base-100 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              Sendddd 
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-72 flex flex-col border-l border-base-300 bg-base-200 overflow-hidden">
        {/* Members header */}
        <div className="p-4 border-b border-base-300 text-lg font-semibold">
          Members ({members.length})
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-base-100 rounded-lg shadow hover:bg-base-300 transition"
            >
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`} alt="avatar" />
                </div>
              </div>
              <span className="font-medium">{member}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;

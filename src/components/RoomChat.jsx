import React, { useState, useEffect, useRef, useContext } from 'react';
import roomChatContext from '../context/roomChat/roomChatContext';
import { Send, X } from 'lucide-react';

const RoomChat = ({ roomId, messageType = 'instant', organizationId = null, classId = null, onClose }) => {
    const {
        messages,
        isConnected,
        joinRoom,
        joinOrganization,
        joinClass,
        sendMessage,
        fetchMessages,
        fetchOrganizationMessages,
        fetchClassMessages
    } = useContext(roomChatContext);

    // Debug logging
    useEffect(() => {
        console.log('RoomChat - Messages updated:', messages);
        console.log('RoomChat - Is connected:', isConnected);
        console.log('RoomChat - Room ID:', roomId);
    }, [messages, isConnected, roomId]);

    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Join appropriate room/chat when component mounts
    useEffect(() => {
        if (roomId && messageType === 'instant') {
            joinRoom(roomId, messageType);
        } else if (organizationId && messageType === 'organization') {
            joinOrganization(organizationId);
            fetchOrganizationMessages(organizationId);
        } else if (classId && messageType === 'class') {
            joinClass(classId);
            fetchClassMessages(classId);
        }
    }, [roomId, messageType, organizationId, classId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        setIsLoading(true);
        const success = await sendMessage(newMessage, organizationId, classId);
        
        if (success) {
            setNewMessage('');
        }
        setIsLoading(false);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const getChatTitle = () => {
        if (messageType === 'organization') return 'Organization Chat';
        if (messageType === 'class') return 'Class Chat';
        return 'Room Chat';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1F2937] text-white rounded-xl w-full max-w-md h-[600px] flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div>
                        <h3 className="text-lg font-semibold">{getChatTitle()}</h3>
                        <p className="text-sm text-gray-400">
                            {isConnected ? 'Connected' : 'Disconnected'} | Room: {roomId}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div key={message._id} className="flex flex-col">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm font-medium text-blue-400">
                                        {message.senderId?.fullname || message.senderId?.username || 'Unknown'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatTime(message.createdAt)}
                                    </span>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading || !isConnected}
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isLoading || !isConnected}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RoomChat;

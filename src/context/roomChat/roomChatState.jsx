import { useState, useEffect, useContext } from 'react';
import roomChatContext from './roomChatContext';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const RoomChatState = (props) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [currentMessageType, setCurrentMessageType] = useState('instant');
    
    const host = "http://localhost:3000/";

    // Initialize socket connection
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && !socket) {
            // Get user ID from token
            let userId = 'user_' + Date.now(); // Fallback user ID
            
            try {
                // Decode JWT token to get user ID
                const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
                userId = tokenPayload.id || tokenPayload.userId || userId;
            } catch (error) {
                console.error('Error decoding token:', error);
            }
            
            const newSocket = io(host, {
                query: {
                    userId: userId
                }
            });

            newSocket.on('connect', () => {
                console.log('Connected to chat server');
                setIsConnected(true);
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from chat server');
                setIsConnected(false);
            });

            newSocket.on('newRoomMessage', (message) => {
                console.log('Received new message:', message);
                setMessages(prev => [...prev, message]);
            });

            newSocket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            setSocket(newSocket);
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    // Join a room for instant messaging
    const joinRoom = (roomId, messageType = 'instant') => {
        if (socket && roomId) {
            socket.emit('joinRoom', roomId);
            setCurrentRoom(roomId);
            setCurrentMessageType(messageType);
            console.log(`Joined room: ${roomId}`);
            // Fetch existing messages when joining
            setTimeout(() => {
                fetchMessages(roomId);
            }, 100); // Small delay to ensure socket is ready
        } else {
            console.log('Socket not ready or roomId missing:', { socket: !!socket, roomId });
        }
    };

    // Join organization for persistent messaging
    const joinOrganization = (organizationId) => {
        if (socket && organizationId) {
            socket.emit('joinOrganization', organizationId);
            setCurrentRoom(`persistent_organization_${organizationId}`);
            setCurrentMessageType('organization');
            console.log(`Joined organization: ${organizationId}`);
        }
    };

    // Join class for persistent messaging
    const joinClass = (classId) => {
        if (socket && classId) {
            socket.emit('joinClassRoom', classId);
            setCurrentRoom(`persistent_class_${classId}`);
            setCurrentMessageType('class');
            console.log(`Joined class: ${classId}`);
        }
    };

    // Leave current room
    const leaveRoom = () => {
        if (socket && currentRoom) {
            socket.emit('leaveRoom', currentRoom);
            setCurrentRoom(null);
            setMessages([]);
            console.log('Left room');
        }
    };

    // Send a message
    const sendMessage = async (text, organizationId = null, classId = null) => {
        if (!socket || !currentRoom || !text.trim()) {
            toast.error('Cannot send message');
            return false;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${host}api/v1/room-messages/room/${currentRoom}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    text: text.trim(),
                    messageType: currentMessageType,
                    organizationId,
                    classId
                })
            });

            if (response.ok) {
                return true;
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to send message');
                return false;
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
            return false;
        }
    };

    // Fetch messages for current room
    const fetchMessages = async (roomId = null) => {
        const targetRoom = roomId || currentRoom;
        if (!targetRoom) return;

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${host}api/v1/room-messages/room/${targetRoom}?messageType=${currentMessageType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data.data || []);
                console.log('Fetched messages:', data.data);
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Fetch organization messages
    const fetchOrganizationMessages = async (organizationId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${host}api/v1/room-messages/organization/${organizationId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data.data || []);
            } else {
                console.error('Failed to fetch organization messages');
            }
        } catch (error) {
            console.error('Error fetching organization messages:', error);
        }
    };

    // Fetch class messages
    const fetchClassMessages = async (classId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${host}api/v1/room-messages/class/${classId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data.data || []);
            } else {
                console.error('Failed to fetch class messages');
            }
        } catch (error) {
            console.error('Error fetching class messages:', error);
        }
    };

    // Clear messages
    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <roomChatContext.Provider value={{
            socket,
            messages,
            isConnected,
            currentRoom,
            currentMessageType,
            joinRoom,
            joinOrganization,
            joinClass,
            leaveRoom,
            sendMessage,
            fetchMessages,
            fetchOrganizationMessages,
            fetchClassMessages,
            clearMessages
        }}>
            {props.children}
        </roomChatContext.Provider>
    );
};

export default RoomChatState;

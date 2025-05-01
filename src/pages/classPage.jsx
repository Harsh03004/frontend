// import React, { useState, useRef, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import { useParams, useNavigate } from "react-router-dom";
// import ClassesContext from "../context/classes/classesContext";
// import axios from "axios";

// const ClassPage = () => {

//   const [classData, setClassData] = useState(null);
//   const [inviteName, setInviteName] = useState("");
//   const [chatInput, setChatInput] = useState("");
//   const [showInviteForm, setShowInviteForm] = useState(false);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);
//   const [members, setMembers] = useState([]); 
//   const [messages, setMessages] = useState([]);
//   const [userDetails, setUserDetails] = useState(null);

//   const { classId, organisationId } = useParams();
//   const { sendInvite } = useContext(ClassesContext);
//   const navigate = useNavigate();
//   const senderId = localStorage.getItem("userId"); // Assuming you have the senderId available

//   // Scroll to bottom on new message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Initialize socket connection
//   useEffect(() => {
//     const socket = io("http://localhost:3000", {
//       withCredentials: true,
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("Connected to socket:", socket.id);
//       socket.emit("joinClass", classId);
//     });

//     // Listen for new messages
//     socket.on("newMessage", (message) => {
//       console.log("Received new message:", message);
//       if (message) {
//         // If message is already in the correct format
//         if (message.text) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//         } 
//         // If message is wrapped in a data property
//         else if (message.data) {
//           setMessages((prevMessages) => [...prevMessages, message.data]);
//         }
//       }
//     });

//     // Listen for any errors
//     socket.on("error", (error) => {
//       console.error("Socket error:", error);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [classId]);

//   // Fetch members and class data
//   const fetchClassData = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/v1/users/classes/${classId}/members`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       if (res.data?.data) {
//         setClassData(res.data.data);
//         setMembers(res.data.data.students || []);
//       }
//     } catch (err) {
//       console.error("Error fetching class data:", err);
//     }
//   };

//   // Fetch existing messages
//   const getMessages = async () => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       const data = await res.json();
//       console.log("Fetched messages:", data);
//       if (data && Array.isArray(data)) {
//         setMessages(data);
//       } else if (data && data.data && Array.isArray(data.data)) {
//         setMessages(data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   // Fetch user details
//   const fetchUserDetails = async () => {
//     try {
//       const res = await fetch('http://localhost:3000/api/v1/users/getUserDetail', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//         }
//       });
//       const data = await res.json();
//       if (data && data.data) {
//         setUserDetails(data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching user details:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const sendMessage = async () => {
//     try {
//       if (!userDetails) {
//         console.error("User details not available");
//         return;
//       }

//       const messagePayload = {
//         text: chatInput.trim(),
//         senderId: {
//           _id: userDetails._id,
//           username: userDetails.username
//         },
//         classId: classId,
//         createdAt: new Date().toISOString()
//       };

//       // Optimistically add the message to the UI
//       setMessages((prevMessages) => [...prevMessages, messagePayload]);

//       const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}/send`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify({ 
//           text: chatInput.trim(),
//           senderId: userDetails._id
//         }),
//       });

//       const response = await res.json();
//       console.log("Sent message response:", response);

//       if (response && response.data) {
//         // Update the optimistic message with the server response
//         setMessages((prevMessages) => {
//           const updatedMessages = [...prevMessages];
//           const lastMessage = updatedMessages[updatedMessages.length - 1];
//           if (lastMessage && lastMessage.text === messagePayload.text) {
//             updatedMessages[updatedMessages.length - 1] = {
//               ...response.data,
//               senderId: {
//                 _id: userDetails._id,
//                 username: userDetails.username
//               }
//             };
//           }
//           return updatedMessages;
//         });

//         // Emit the message to other clients with the full message data
//         if (socketRef.current) {
//           const messageToEmit = {
//             ...response.data,
//             senderId: {
//               _id: userDetails._id,
//               username: userDetails.username
//             }
//           };
//           socketRef.current.emit("newMessage", messageToEmit);
//           // Also broadcast to the class room
//           socketRef.current.emit("broadcastMessage", {
//             room: classId,
//             message: messageToEmit
//           });
//         }
//       }

//       setChatInput("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//       // Remove the optimistic message if there was an error
//       setMessages((prevMessages) => prevMessages.filter(msg => msg !== messagePayload));
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (chatInput.trim()) {
//       await sendMessage();
//     }
//   };

//   useEffect(() => {
//     if (classId) {
//       fetchClassData();
//       getMessages();
//     }
//   }, [classId]);

//   const handleInvite = async (e) => {
//     e.preventDefault();
//     if (inviteName) {
//       await sendInvite(organisationId, classId, inviteName);
//       setInviteName("");
//     }
//   };

//   return (
//     <div className="h-screen flex bg-base-200 text-base-content max-h-235">
//       <div className="flex flex-col flex-1">
//         <div className="navbar bg-base-100 shadow-md">
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold">{classData?.name || "Loading..."}</h1>
//           </div>
//           <div className="flex-none">
//             <button
//               onClick={() => setShowInviteForm(!showInviteForm)}
//               className="btn btn-primary"
//             >
//               {showInviteForm ? "Close" : "Invite Member"}
//             </button>
//           </div>
//         </div>

//         {showInviteForm && (
//           <form onSubmit={handleInvite} className="p-4 bg-base-100 border-b border-base-300 flex gap-4">
//             <input
//               type="text"
//               value={inviteName}
//               onChange={(e) => setInviteName(e.target.value)}
//               placeholder="Enter member name"
//               className="input input-bordered w-full"
//             />
//             <button type="submit" className="btn btn-success">Invite</button>
//           </form>
//         )}

//         <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
//           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
//             {Array.isArray(messages) && messages.length === 0 ? (
//               <div className="text-center text-base-content/50 mt-10">
//                 No messages yet. Start the conversation!
//               </div>
//             ) : (
//               messages?.map((msg, index) => (
//                 <div key={index} className="chat chat-start">
//                   <div className="chat-header mb-1 text-sm text-base-content/60">
//                     {msg?.senderId?.username || "Unknown"} •{" "}
//                     {msg?.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit"
//                     }) : ""}
//                   </div>
//                   <div className="chat-bubble">{msg?.text || ""}</div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           <form onSubmit={handleSendMessage} className="p-4 bg-base-100 border-t border-base-300 flex gap-2">
//             <input
//               type="text"
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder="Type your message..."
//               className="input input-bordered w-full"
//             />
//             <button type="submit" className="btn btn-primary">Send</button>
//           </form>
//         </div>
//       </div>

//       <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
//         <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
//           Members ({Array.isArray(members) ? members.length : 0})
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {Array.isArray(members) && members.length === 0 ? (
//             <div className="text-center">No members in this class</div>
//           ) : (
//             members?.map((member, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
//               >
//                 <div className="avatar placeholder">
//                   <div className="bg-primary text-primary-content rounded-full w-10 h-10">
//                     {member?.user?.avatar ? (
//                       <img src={member.user.avatar} alt="Avatar" className="rounded-full w-10 h-10" />
//                     ) : (
//                       <span className="text-lg font-bold">
//                         {member?.user?.username?.[0]?.toUpperCase() || "?"}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <span className="font-medium">{member?.user?.username || "Unknown"}</span>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassPage;






import React, { useState, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import ClassesContext from "../context/classes/classesContext";
import axios from "axios";

const ClassPage = () => {

  const [classData, setClassData] = useState(null);
  const [inviteName, setInviteName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [members, setMembers] = useState([]); 
  const [messages, setMessages] = useState([]);

  const { classId, organisationId } = useParams();
  const { sendInvite } = useContext(ClassesContext);
  const navigate = useNavigate();
  const senderId = localStorage.getItem("userId"); // Assuming you have the senderId available

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize socket connection and join class
  // useEffect(() => {
  //   const socket = io("http://localhost:3000", {
  //     withCredentials: true,
  //   });

  //   socketRef.current = socket;

  //   socket.on("connect", () => {
  //     console.log("Connected to socket:", socket.id);
  //     // Emit to join the class on socket connection
  //     socket.emit("joinClass", classId);
  //   });

  //   socket.on("newMessage", (message) => {
  //     // Update messages with new message from other clients in real-time
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [classId]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });
  
    socketRef.current = socket;
  
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joinClass", classId);
    });
  
    // Listen for incoming new messages and update the messages state
    socket.on("newMessage", (message) => {
      console.log("Received new message:", message); // Debug log to see if it's being received
      setMessages((prevMessages) => [...prevMessages, message]); // Add new message to state
    });
  
    return () => {
      socket.disconnect();
    };
  }, [classId]);
  
  // Fetch members and class data
  const fetchClassData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/users/classes/${classId}/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res.data?.data) {
        setClassData(res.data.data);
        setMembers(res.data.data.students || []);
      }
    } catch (err) {
      console.error("Error fetching class data:", err);
    }
  };

  // Fetch existing messages
  const getMessages = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      setMessages(data); // ✅ directly set the array
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // const sendMessage = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}/send`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //       body: JSON.stringify({ text: chatInput.trim() }),
  //     });

  //     const message = await res.json();

  //     if (socketRef.current) {
  //       socketRef.current.emit("sendMessage", message.data); // Send the message to the backend to broadcast to all clients
  //     }

  //     setChatInput(""); // Clear chat input after sending the message
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   }
  // };

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (chatInput.trim()) {
  //     await sendMessage();
  //   }
  // };
  // const sendMessage = async () => {
  //   try {
  //     const newMessage = {
  //       text: chatInput.trim(),
  //       senderId,// Assuming you have the senderId available
  //       classId: classId,
  //       createdAt: new Date(),
  //     };

  //     // Optimistically update the UI by adding the new message
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  
  //     // Send the message to the backend
  //     const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}/send`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //       body: JSON.stringify({ text: chatInput.trim() }),
  //     });
  
  //     const message = await res.json();
  
  //     if (socketRef.current) {
  //       socketRef.current.emit("sendMessage", message.data); // Emit to other clients
  //     }
  
  //     setChatInput(""); // Clear chat input after sending the message
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   }
  // };
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      await sendMessage();
    }
  };
  

  const sendMessage = async () => {
    try {
      const messagePayload = {
        text: chatInput.trim(),
        senderId,
        classId,
        createdAt: new Date(),
      };
  
      // Only emit, don't optimistically add it to UI
      const res = await fetch(`http://localhost:3000/api/v1/messages/${classId}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ text: chatInput.trim() }),
      });
  
      const message = await res.json();
  
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", message.data);
      }
  
      setChatInput(""); // Clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchClassData();
      getMessages();
    }
  }, [classId]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (inviteName) {
      await sendInvite(organisationId, classId, inviteName);
      setInviteName("");
    }
  };

  return (
    <div className="h-screen flex bg-base-200 text-base-content max-h-235">
      <div className="flex flex-col flex-1">
        <div className="navbar bg-base-100 shadow-md">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{classData?.name || "Loading..."}</h1>
          </div>
          <div className="flex-none">
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              className="btn btn-primary"
            >
              {showInviteForm ? "Close" : "Invite Member"}
            </button>
          </div>
        </div>

        {showInviteForm && (
          <form onSubmit={handleInvite} className="p-4 bg-base-100 border-b border-base-300 flex gap-4">
            <input
              type="text"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Enter member name"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-success">Invite</button>
          </form>
        )}

        <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
            {Array.isArray(messages) && messages.length === 0 ? (
              <div className="text-center text-base-content/50 mt-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages?.map((msg, index) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-header mb-1 text-sm text-base-content/60">
                    {msg.senderId?.username || "Unknown"} •{" "}
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-base-100 border-t border-base-300 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>

      <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
        <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
          Members ({Array.isArray(members) ? members.length : 0})
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Array.isArray(members) && members.length === 0 ? (
            <div className="text-center">No members in this class</div>
          ) : (
            members?.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10 h-10">
                    {member?.user?.avatar ? (
                      <img src={member.user.avatar} alt="Avatar" className="rounded-full w-10 h-10" />
                    ) : (
                      <span className="text-lg font-bold">
                        {member?.user?.username?.[0]?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-medium">{member?.user?.username || "Unknown"}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
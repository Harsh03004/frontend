// // // import React, { useState, useRef, useEffect } from "react";

// // // const ClassPage = () => {
// // //   const [members, setMembers] = useState(["Alice", "Bob"]);
// // //   const [showInviteForm, setShowInviteForm] = useState(false);
// // //   const [inviteName, setInviteName] = useState("");
// // //   const [messages, setMessages] = useState([]);
// // //   const [chatInput, setChatInput] = useState("");
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   const handleInvite = (e) => {
// // //     e.preventDefault();
// // //     if (inviteName.trim()) {
// // //       setMembers([...members, inviteName.trim()]);
// // //       setInviteName("");
// // //       setShowInviteForm(false);
// // //     }
// // //   };

// // //   const handleSendMessage = (e) => {
// // //     e.preventDefault();
// // //     if (chatInput.trim()) {
// // //       setMessages([...messages, chatInput.trim()]);
// // //       setChatInput("");
// // //     }
// // //   };

// // //   return (
// // //     <div className="h-screen flex bg-base-200 text-base-content max-h-235">
// // //       {/* Chat Main Section */}
// // //       <div className="flex flex-col flex-1">
// // //         {/* Top Bar */}
// // //         <div className="navbar bg-base-100 shadow-md">
// // //           <div className="flex-1">
// // //             <h1 className="text-2xl font-bold">Class Chat</h1>
// // //           </div>
// // //           <div className="flex-none">
// // //             <button
// // //               onClick={() => setShowInviteForm(!showInviteForm)}
// // //               className="btn btn-primary"
// // //             >
// // //               {showInviteForm ? "Close" : "Invite Member"}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Invite Member Form */}
// // //         {showInviteForm && (
// // //           <form
// // //             onSubmit={handleInvite}
// // //             className="p-4 bg-base-100 border-b border-base-300 flex gap-4"
// // //           >
// // //             <input
// // //               type="text"
// // //               value={inviteName}
// // //               onChange={(e) => setInviteName(e.target.value)}
// // //               placeholder="Enter member name"
// // //               className="input input-bordered w-full"
// // //             />
// // //             <button type="submit" className="btn btn-success">
// // //               Invite
// // //             </button>
// // //           </form>
// // //         )}

// // //         {/* Messages List + Input */}
// // // <div className="flex flex-col flex-1">
// // //   {/* Messages */}
// // //   <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
// // //   {/* Messages */}
// // //   <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
// // //     {messages.length === 0 ? (
// // //       <div className="text-center text-base-content/50 mt-10">
// // //         No messages yet. Start the conversation!
// // //       </div>
// // //     ) : (
// // //       messages.map((msg, index) => (
// // //         <div key={index} className="chat chat-start">
// // //           <div className="chat-bubble">{msg}</div>
// // //         </div>
// // //       ))
// // //     )}
// // //     <div ref={messagesEndRef} />
// // //   </div>

// // //   {/* Chat Input */}
// // //   <form
// // //     onSubmit={handleSendMessage}
// // //     className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
// // //   >
// // //     <input
// // //       type="text"
// // //       value={chatInput}
// // //       onChange={(e) => setChatInput(e.target.value)}
// // //       placeholder="Type your message..."
// // //       className="input input-bordered w-full"
// // //     />
// // //     <button type="submit" className="btn btn-primary">
// // //       Send
// // //     </button>
// // //   </form>
// // // </div>
// // // </div>
// // //       </div>

// // //       {/* Sidebar */}
// // //       <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
// // //         {/* Members header */}
// // //         <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
// // //           Members ({members.length})
// // //         </div>

// // //         {/* Members List */}
// // //         <div className="flex-1 overflow-y-auto p-4 space-y-3">
// // //           {members.map((member, index) => (
// // //             <div
// // //               key={index}
// // //               className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
// // //             >
// // //               <div className="avatar placeholder">
// // //                 <div className="bg-primary text-primary-content rounded-full w-10">
// // //                   <span className="text-lg font-bold">
// // //                     {member[0].toUpperCase()}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //               <span className="font-medium">{member}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ClassPage;

// import React, { useState, useRef, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import { useParams, useNavigate} from "react-router-dom"; 
// import ClassesContext from "../context/classes/classesContext";


// const socket = io("http://localhost:3000", {
//   query: {
//     userId: "USER_ID_HERE", // Replace with actual logged-in user ID
//   },
// });

// const ClassPage = () => {
//   const [members, setMembers] = useState([]);
//   const [showInviteForm, setShowInviteForm] = useState(false);
//   const [classData, setClassData] = useState(null);
//   const [inviteName, setInviteName] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatInput, setChatInput] = useState("");
//   const messagesEndRef = useRef(null);
//   const {classes } = useContext(ClassesContext); 
//   const { classId } = useParams();
//   const organisationId = useParams();
//   console.log("Organisation ID:", organisationId);
//   console.log("Class ID:", classId);  
//   const token = localStorage.getItem("token");  
//   const navigate = useNavigate();
//   const {sendInvite} = useContext(ClassesContext); // Assuming sendInvite is a function in your context


//   const handleGoBack = () => {
//     navigate(-1);
//   };
//   // Scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Join class room and listen for messages
//   useEffect(() => {
//     if (!classId) return;

//     socket.emit("joinClass", classId);

//     socket.on("newMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [classId]);

//   // Fetch members and messages from backend
//   const fetchClassData = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/v1/classes/${classId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you're using JWT for authentication
//         },
//       });
//       setClassData(res.data.data);  // Set the class data into state
//       setLoading(false);  // Stop the loading spinner
//     } catch (err) {
//       console.error("Error fetching class data:", err);
//       setError("Failed to load class data");
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchClassData();
//   }, [classId]);

//   const handleInvite = async (e) => {
//     e.preventDefault();
//     await sendInvite(organisationId, classId, inviteName); 
//   }

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;

//     const message = {
//       text: chatInput.trim(),
//       classId,
//     };

//     socket.emit("sendMessage", message);
//     setChatInput("");
//   };

//   return (
//     <div className="h-screen flex bg-base-200 text-base-content max-h-235">
//       {/* Chat Section */}
//       <div className="flex flex-col flex-1">
//         {/* Top Bar */}
//         <div className="navbar bg-base-100 shadow-md">
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold">{classId}</h1>
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

//         {/* Invite Member Form */}
//         {showInviteForm && (
//           <form
//             onSubmit={handleInvite}
//             className="p-4 bg-base-100 border-b border-base-300 flex gap-4"
//           >
//             <input
//               type="text"
//               value={inviteName}
//               onChange={(e) => setInviteName(e.target.value)}
//               placeholder="Enter member name"
//               className="input input-bordered w-full"
//             />
//             <button type="submit" className="btn btn-success">
//               Invite
//             </button>
//           </form>
//         )}

//         {/* Messages and Input */}
//         <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
//             {messages.length === 0 ? (
//               <div className="text-center text-base-content/50 mt-10">
//                 No messages yet. Start the conversation!
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={index} className="chat chat-start">
//                   <div className="chat-bubble">{msg.text}</div>
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <form
//             onSubmit={handleSendMessage}
//             className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
//           >
//             <input
//               type="text"
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder="Type your message..."
//               className="input input-bordered w-full"
//             />
//             <button type="submit" className="btn btn-primary">
//               Send
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Sidebar: Members */}
//       <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
//         <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
//           Members ({members.length})
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {members.map((member, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
//             >
//               <div className="avatar placeholder">
//                 <div className="bg-primary text-primary-content rounded-full w-10">
//                   <span className="text-lg font-bold">
//                     {member.name?.[0].toUpperCase() || "?"}
//                   </span>
//                 </div>
//               </div>
//               <span className="font-medium">{member.name || member}</span>
//             </div>
//           ))}
//         </div>
//       </div>


//     </div>
//   );
// };

// export default ClassPage;




// // import React, { useState, useRef, useEffect, useContext } from "react";
// // import { useParams } from "react-router-dom";
// // import { toast } from "react-hot-toast";
// // import ClassesContext from "../context/classes/classesContext";

// // const ClassPage = () => {
// //   const [inviteName, setInviteName] = useState("");
// //   const [chatInput, setChatInput] = useState("");
// //   const [showInviteForm, setShowInviteForm] = useState(false);
// //   const { classId } = useParams();
// //   const messagesEndRef = useRef(null);

// //   const {
// //     classes,
// //     messages,
// //     joinClass,
// //     sendMessage,
// //     setMessages,
// //     fetchClasses,
// //   } = useContext(ClassesContext);

// //   const token = localStorage.getItem("accessToken");

// //   useEffect(() => {
// //     if (classId) {
// //       joinClass(classId); // Join class on page load
// //     }
// //   }, [classId, joinClass]);

// //   useEffect(() => {
// //     // Scroll to latest message when messages update
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleInvite = async (e) => {
// //     e.preventDefault();
// //     if (!inviteName.trim()) return;

// //     try {
// //       // Assuming there's an API endpoint for inviting a member
// //       const response = await fetch(`/api/classes/${classId}/invite`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ name: inviteName }),
// //       });

// //       const data = await response.json();
// //       setInviteName("");
// //       setShowInviteForm(false);
// //       toast.success("Member invited successfully!");
// //       // Optional: Update members list
// //     } catch (err) {
// //       console.error("Error inviting member:", err);
// //       toast.error("Failed to invite member.");
// //     }
// //   };

// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //     if (!chatInput.trim()) return;

// //     sendMessage(classId, chatInput.trim()); // Send message via socket
// //     setChatInput(""); // Clear input after sending
// //   };

// //   return (
// //     <div className="h-screen flex bg-base-200 text-base-content max-h-235">
// //       {/* Chat Section */}
// //       <div className="flex flex-col flex-1">
// //         {/* Top Bar */}
// //         <div className="navbar bg-base-100 shadow-md">
// //           <div className="flex-1">
// //             <h1 className="text-2xl font-bold">Class Chat</h1>
// //           </div>
// //           <div className="flex-none">
// //             <button
// //               onClick={() => setShowInviteForm(!showInviteForm)}
// //               className="btn btn-primary"
// //             >
// //               {showInviteForm ? "Close" : "Invite Member"}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Invite Member Form */}
// //         {showInviteForm && (
// //           <form
// //             onSubmit={handleInvite}
// //             className="p-4 bg-base-100 border-b border-base-300 flex gap-4"
// //           >
// //             <input
// //               type="text"
// //               value={inviteName}
// //               onChange={(e) => setInviteName(e.target.value)}
// //               placeholder="Enter member name"
// //               className="input input-bordered w-full"
// //             />
// //             <button type="submit" className="btn btn-success">
// //               Invite
// //             </button>
// //           </form>
// //         )}

// //         {/* Messages List + Input */}
// //         <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
// //           {/* Messages */}
// //           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
// //             {messages.length === 0 ? (
// //               <div className="text-center text-base-content/50 mt-10">
// //                 No messages yet. Start the conversation!
// //               </div>
// //             ) : (
// //               messages.map((msg, index) => (
// //                 <div key={index} className="chat chat-start">
// //                   <div className="chat-bubble">{msg.text}</div>
// //                 </div>
// //               ))
// //             )}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {/* Input */}
// //           <form
// //             onSubmit={handleSendMessage}
// //             className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
// //           >
// //             <input
// //               type="text"
// //               value={chatInput}
// //               onChange={(e) => setChatInput(e.target.value)}
// //               placeholder="Type your message..."
// //               className="input input-bordered w-full"
// //             />
// //             <button type="submit" className="btn btn-primary">
// //               Send
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Sidebar: Members */}
// //       <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
// //         {/* Members header */}
// //         <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
// //           Members ({classes.length}) {/* This could be updated to show actual members */}
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-4 space-y-3">
// //           {classes.map((cls, index) => (
// //             <div
// //               key={index}
// //               className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
// //             >
// //               <div className="avatar placeholder">
// //                 <div className="bg-primary text-primary-content rounded-full w-10">
// //                   <span className="text-lg font-bold">
// //                     {cls.name[0]?.toUpperCase() || "?"}
// //                   </span>
// //                 </div>
// //               </div>
// //               <span className="font-medium">{cls.name || "Unnamed Class"}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClassPage;




import React, { useState, useRef, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate} from "react-router-dom"; 
import ClassesContext from "../context/classes/classesContext";
import axios from "axios";

const socket = io("http://localhost:3000", {
  query: {
    userId: "USER_ID_HERE", // Replace with actual logged-in user ID
  },
});

const ClassPage = () => {
  const [members, setMembers] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [classData, setClassData] = useState(null);
  const [inviteName, setInviteName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);
  const { classes } = useContext(ClassesContext); 
  const { classId } = useParams();
  const organisationId = useParams();
  console.log("Organisation ID:", organisationId);
  console.log("Class ID:", classId);  
  const token = localStorage.getItem("token");  
  const navigate = useNavigate();
  const { sendInvite } = useContext(ClassesContext); // Assuming sendInvite is a function in your context

  const handleGoBack = () => {
    navigate(-1);
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join class room and listen for messages
  useEffect(() => {
    if (!classId) return;

    socket.emit("joinClass", classId);

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [classId]);

  // Fetch members and messages from backend
  const fetchClassData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/users/classes/${classId}/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you're using JWT for authentication
        },
      });

      // Ensure we check if `res.data.data` is valid and populate class data
      if (res.data && res.data.data) {
        setClassData(res.data.data); // Set the class data into state
        setMembers(res.data.data.students || []); // Ensure we correctly fetch the students/members
        console.log("Class data:", res.data.data);
        console.log("Members:", res.data.data.students);
      }
    } catch (err) {
      console.error("Error fetching class data:", err);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchClassData(); // Fetch class data when classId changes or the page loads
    }
  }, [classId]);

  const handleInvite = async (e) => {
    e.preventDefault();
    await sendInvite(organisationId, classId, inviteName); 
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const message = {
      text: chatInput.trim(),
      classId,
    };

    socket.emit("sendMessage", message);
    setChatInput("");
  };

  return (
    <div className="h-screen flex bg-base-200 text-base-content max-h-235">
      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
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

        {/* Invite Member Form */}
        {showInviteForm && (
          <form
            onSubmit={handleInvite}
            className="p-4 bg-base-100 border-b border-base-300 flex gap-4"
          >
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

        {/* Messages and Input */}
        <div className="flex flex-col flex-1 max-h-[calc(100vh-4rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-base-200">
            {messages.length === 0 ? (
              <div className="text-center text-base-content/50 mt-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="chat chat-start">
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-base-100 border-t border-base-300 flex gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar: Members */}
      <div className="w-80 flex flex-col border-l border-base-300 bg-base-100">
        <div className="p-4 bg-base-100 shadow-md text-lg font-semibold">
          Members ({members.length})
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {members.length === 0 ? (
            <div className="text-center">No members in this class</div>
          ) : (
            members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-base-200 rounded-lg shadow hover:bg-base-300 transition"
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10">
                    {member.user.avatar ?(
                      <img src={member.user.avatar} alt="Avatar" className="rounded-full w-10 h-10" />
                    ) : (
                      <span className="text-lg font-bold">
                        {member.user.username?.[0]?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-medium">{member.user.username}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;

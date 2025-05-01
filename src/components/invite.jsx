import React, { useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Invite = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = "localhost:3000"
  const fetchInvites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/v1/users/invites`,{
        headers: {
          "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,}
      });
      setInvites(res.data.data);
      console.log(res.data.data);   
    } catch (err) {
      console.error("Failed to fetch invites", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/users/invites/${id}/accept`,
        {}, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setInvites((prev) => prev.filter((invite) => invite._id !== id));
        toast.success("Invite accepted successfully!");

    } catch (err) {
      console.error("Failed to accept invite", err);
    }
  };
  

  const handleDecline = async (id) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/users/invites/${id}/decline`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setInvites((prev) => prev.filter((invite) => invite._id !== id));
    } catch (err) {
      console.error("Failed to decline invite", err);
    }
  };


  return (
    <div className="min-h-screen bg-base-200 p-6 text-base-content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Invites</h1>
        <button
          className={`btn btn-primary ${loading ? "loading" : ""}`}
          onClick={fetchInvites}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Invites"}
        </button>
      </div>

      {Array.isArray(invites) && invites.length === 0 ? (
  <div className="text-center text-lg mt-10">No invites available.</div>
) : (
  <div className="grid gap-4">
    {invites?.map((invite) => (
      <div
        key={invite._id}
        className="card shadow-md bg-base-100 text-base-content"
      >
        <div className="card-body">
          <h2 className="card-title">{invite.class.name || "unnamed class "}</h2>
          <p className="text-sm text-neutral-content">
            {invite.class.description}
          </p>
          <p className="text-sm">
            Invited by:{" "}
            <span className="font-medium">{invite.invitedBy.username}</span>
          </p>
          <p className="text-sm text-accent-content">
            Status: {invite.status}
          </p>

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleAccept(invite._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => handleDecline(invite._id)}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
}   

export default Invite;

import React, { useState } from "react";
import ClassesContext from "./classesContext";
import { toast } from "react-hot-toast";  
const ClassesState = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const host = "http://localhost:3000";

  const token = localStorage.getItem("accessToken");
  // Fetch all classes for an organization
  const fetchClasses = async (organizationId) => {
    try {
      setLoading(true);
      const response = await fetch(`${host}/api/v1/organisation/${organizationId}/classes`, {
        headers: {
          Authorization: `Bearer ${token}`, // if needed
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message || "Error fetching classes");
  
      setClasses(result.data.classes || []); // since data is wrapped inside .data.classes
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new class in an organization
  const createClass = async (organizationId, newClass) => {
    try {
      setLoading(true);
  
      const response = await fetch(`${host}/api/v1/organisation/${organizationId}/createClass`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // if needed
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });
  
      const result = await response.json();
  
      if(response.status === 200) {
        setClasses((prev) => [...prev, result.data]);
        toast.success("Class created successfully");  
      } 
  
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create class");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (organizationId, classId) => {
    try {

      setLoading(true);
      const response = await fetch(`${host}/api/v1/organisation/${organizationId}/deleteClass/${classId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // if needed
          "Content-Type": "application/json",
        },
      });

      if(response.status === 200) {
        console.log("Class deleted successfully");
        setClasses((prev) => prev.filter((cls) => cls._id !== classId));
        toast.success("Class deleted successfully");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete class"); 
    } finally {
      setLoading(false);
    }
  }

  const sendInvite = async (organizationId, classId, username) => {
    try {
      setLoading(true);
  
      const response = await fetch(`${host}/api/v1/organisation/${organizationId}/classes/${classId}/invite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }), // Send the username instead of email
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        toast.success("Invite sent successfully");
      } else {
        throw new Error(result.message || "Failed to send invite");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClassesContext.Provider
      value={{
        classes,
        loading,
        error,
        fetchClasses,
        createClass,
        deleteClass,
        sendInvite
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export default ClassesState;
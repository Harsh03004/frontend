import React, { useState } from "react";
import ClassesContext from "./classesContext";

const ClassesState = ({ children }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch classes for an organisation
  // const host = "http://localhost:3000";
  // const fetchClasses = async (organizationId) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${host}/api/v1/organisation/${organizationId}/classes`);
  //     const data = await response.json();
  //     setClasses(data || []);
  //   } catch (err) {
  //     setError("Failed to fetch classes");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Create a new class
  // const createClass = async (organisationId, newClass) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${host}/api/organisation/${organisationId}/createClass`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newClass),
  //     });
  //     const createdClass = await response.json();
  //     setClasses((prev) => [...prev, createdClass]);
  //   } catch (err) {
  //     setError("Failed to create class");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  
      if (!response.ok) throw new Error(result.message || "Error creating class");
  
      setClasses((prev) => [...prev, result.data]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create class");
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
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export default ClassesState;
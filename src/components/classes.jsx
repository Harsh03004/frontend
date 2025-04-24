import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ClassesContext from "../context/classes/classesContext";

const Classes = () => {
  const { organisationId } = useParams(); // Get organisation ID from URL
  const { classes, loading, error, fetchClasses, createClass } = useContext(ClassesContext);

  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");

  // Fetch classes when the component is mounted
  useEffect(() => {
    if (organisationId) {
      fetchClasses(organisationId);
    }
  }, [organisationId]);

  // Handle creating a new class
  const handleCreateClass = async (e) => {
    e.preventDefault();
    await createClass(organisationId, {
      name: newClassName,
      description: newClassDescription,
    });
    setNewClassName("");
    setNewClassDescription("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
      <h1 className="text-2xl font-bold mb-6">Classes</h1>

      {/* Create Class Form */}
      <form
        onSubmit={handleCreateClass}
        className="bg-base-200 p-4 rounded-lg shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Class Name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Class Description"
          value={newClassDescription}
          onChange={(e) => setNewClassDescription(e.target.value)}
          required
          className="textarea textarea-bordered w-full"
        />
        <button
          type="submit"
          disabled={loading || !newClassName.trim()}
          className={`btn btn-success ${loading ? "loading" : ""}`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Class List */}
      {loading ? (
        <div className="text-center text-gray-500">Loading classes...</div>
      ) : classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls, index) => (
            <div
              key={cls._id || index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">{cls.name || "Untitled"}</h2>
                <p>{cls.description || "No Description Available"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No classes found</div>
      )}
    </div>
  );
};

export default Classes;

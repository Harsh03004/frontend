// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ClassesContext from "../context/classes/classesContext";
// import { nav } from "framer-motion/client";
// import { Plus, X } from "lucide-react";

// const Classes = () => {
//   const { organisationId } = useParams(); // Get organisation ID from URL
//   const { classes, loading, error, fetchClasses, createClass } = useContext(ClassesContext);
//   const navigate = useNavigate();
//   const [newClassName, setNewClassName] = useState("");
//   const [newClassDescription, setNewClassDescription] = useState("");

//   // Fetch classes when the component is mounted
//   useEffect(() => {
//     if (organisationId) {
//       fetchClasses(organisationId);
//     }
//   }, [organisationId]);

//   // Handle creating a new class
//   const handleCreateClass = async (e) => {
//     e.preventDefault();
//     await createClass(organisationId, {
//       name: newClassName,
//       description: newClassDescription,
//     });
//     setNewClassName("");
//     setNewClassDescription("");
//   };

//   const [showForm, setShowForm] = useState(false);
// const handleGoBack = () => {  
//   navigate(-1);
// }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button onClick={handleGoBack} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//         Go back 
//       </button>
//       {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
//       <h1 className="text-2xl font-bold mb-6">Classes</h1>

//       {/* Create Class Form */}
//       <button
//           onClick={() => setShowForm((prev) => !prev)}
//           className="btn btn-primary flex items-center gap-2"
//         >
//           {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {showForm ? "Cancel" : "New"}
//         </button>
//         {showForm && (<form
//         onSubmit={handleCreateClass}
//         className="bg-base-200 p-4 rounded-lg shadow-md mb-6 space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Class Name"
//           value={newClassName}
//           onChange={(e) => setNewClassName(e.target.value)}
//           required
//           className="input input-bordered w-full"
//         />
//         <textarea
//           placeholder="Class Description"
//           value={newClassDescription}
//           onChange={(e) => setNewClassDescription(e.target.value)}
//           required
//           className="textarea textarea-bordered w-full"
//         />
//         <button
//           type="submit"
//           disabled={loading || !newClassName.trim()}
//           className={`btn btn-success ${loading ? "loading" : ""}`}
//         >
//           {loading ? "Creating..." : "Create"}
//         </button>
//       </form>
//         )}

      

//       {/* Class List */}
//       {loading ? (
//         <div className="text-center text-gray-500">Loading classes...</div>
//       ) : classes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {classes.map((cls, index) => (
//             <div
//               key={cls._id || index}
//               className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="card-body">
//                 <h2 className="card-title">{cls.name || "Untitled"}</h2>
//                 <p>{cls.description || "No Description Available"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">No classes found</div>
//       )}
//     </div>
//   );
// };

// export default Classes;


import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClassesContext from "../context/classes/classesContext";
import { Plus, X } from "lucide-react";

const Classes = () => {
  const { organisationId } = useParams(); // FIXED here
  const { classes, loading, error, fetchClasses, createClass, deleteClass } = useContext(ClassesContext);
  const navigate = useNavigate();
  
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (organisationId) {
      fetchClasses(organisationId);
    }
  }, [organisationId]);
  

  const handleCreateClass = async (e) => {
    e.preventDefault();
    await createClass(organisationId, {
      name: newClassName,
      description: newClassDescription,
    });
    setNewClassName("");
    setNewClassDescription("");
    setShowForm(false); // Auto-close the form after creation (optional UX)
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteClass = async (classId) => {
  console.log(classId)
  console.log(organisationId)
    try {
      await deleteClass(organisationId, classId); // Call the API to delete the class
      classes((prev) => prev.filter((cls) => cls._id !== classId)); // Remove the deleted class from the state
    } catch (err) {
      setError ("Failed to delete class");
    }finally
    {
      loading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Go Back Button */}
      <button onClick={handleGoBack} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go back
      </button>

      {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Classes</h1>

      {/* New / Cancel Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="btn btn-primary flex items-center gap-2 mb-6"
      >
        {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {showForm ? "Cancel" : "New"}
      </button>

      {/* Create Class Form */}
      {showForm && (
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
            className={`btn btn-success w-full ${loading ? "loading" : ""}`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      )}

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
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDeleteClass(cls._id)}
          >
            Delete
          </button>
        </div>
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

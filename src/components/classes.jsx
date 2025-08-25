import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClassesContext from "../context/classes/classesContext";
import { Plus, X, ArrowLeft, BookOpen, Trash2 } from "lucide-react";

const Classes = () => {
  const { organisationId } = useParams();
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
    await createClass(organisationId, { name: newClassName, description: newClassDescription });
    setNewClassName("");
    setNewClassDescription("");
    setShowForm(false);
  };

  const handleDeleteClass = async (e, classId) => {
    e.stopPropagation();
    await deleteClass(organisationId, classId);
  };

  return (
      <div className="bg-[#111827] text-gray-200 font-sans w-full p-10 min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <button
              onClick={() => navigate(-1)}
              className="btn btn-circle bg-gray-700 hover:bg-gray-600 border-none"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-white">Classes</h1>
        </div>

        <div className="flex justify-end mb-8">
          <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            <span>{showForm ? "Cancel" : "New Class"}</span>
          </button>
        </div>

        {showForm && (
            <div className="bg-[#1F2937] p-6 rounded-xl mb-8">
              <form onSubmit={handleCreateClass} className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Create New Class</h2>
                <input
                    type="text"
                    placeholder="Class Name"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    required
                    className="input input-bordered w-full bg-[#2b3a4e] border-gray-600 rounded-lg p-3 text-white"
                />
                <textarea
                    placeholder="Class Description"
                    value={newClassDescription}
                    onChange={(e) => setNewClassDescription(e.target.value)}
                    required
                    className="textarea textarea-bordered w-full bg-[#2b3a4e] border-gray-600 rounded-lg p-3 text-white"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </form>
            </div>
        )}

        {loading ? (
            <p className="text-center text-gray-400">Loading classes...</p>
        ) : classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                  <div
                      key={cls._id}
                      className="bg-[#1F2937] rounded-xl p-6 flex flex-col justify-between hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer"
                      onClick={() => navigate(`/organisation/${organisationId}/classes/${cls._id}`)}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="text-indigo-400" size={24} />
                        <h2 className="text-xl font-bold text-white truncate">{cls.name}</h2>
                      </div>
                      <p className="text-gray-400 text-sm h-16">{cls.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                          onClick={(e) => handleDeleteClass(e, cls._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <div className="text-center py-16 bg-[#1F2937] rounded-xl">
              <h2 className="text-xl font-semibold text-white">No classes found</h2>
              <p className="text-gray-400 mt-2">Get started by creating a new class.</p>
            </div>
        )}
      </div>
  );
};

export default Classes;
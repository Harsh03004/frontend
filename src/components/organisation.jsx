import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Building2, Trash2 } from "lucide-react";
import organisationContext from "../context/organisations/organisationContext";
import userContext from "../context/user/userContext";

const Organisation = () => {
  const { fetchOrganisations, createOrganisation, deleteOrganisation } = useContext(organisationContext);
  const { checkRefreshToken, userDetail } = useContext(userContext);

  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      await userDetail();

      try {
        const data = await fetchOrganisations();
        setOrganisations(data || []);
      } catch (err) {
        setError("Failed to fetch organisations");
      } finally {
        setLoading(false);
      }
    };

    checkRefreshToken().then(loadData);
  }, []);

  const handleCreateOrganisation = async (e) => {
    e.preventDefault();
    await createOrganisation({
      name: newOrgName,
      description: newOrgDescription,
    });
    setNewOrgName("");
    setNewOrgDescription("");
    setShowForm(false);
    hasFetched.current = false; // Refetch after creating
  };

  const handleDeleteOrganisation = async (e, organisationId) => {
    e.stopPropagation(); // Prevent navigation when clicking the delete button
    await deleteOrganisation(organisationId);
    setOrganisations(prev => prev.filter(org => org._id !== organisationId));
  };

  return (
      <div className="bg-[#111827] text-gray-200 font-sans w-full p-10 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Organisations</h1>
          <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {showForm ? <X size={20} /> : <Plus size={20} />}
            <span>{showForm ? "Cancel" : "New Organisation"}</span>
          </button>
        </div>

        {showForm && (
            <div className="bg-[#1F2937] p-6 rounded-xl mb-8">
              <form onSubmit={handleCreateOrganisation} className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Create New Organisation</h2>
                <input
                    type="text"
                    placeholder="Organisation Name"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    required
                    className="input input-bordered w-full bg-[#2b3a4e] border-gray-600 rounded-lg p-3 text-white"
                />
                <textarea
                    placeholder="Organisation Description"
                    value={newOrgDescription}
                    onChange={(e) => setNewOrgDescription(e.target.value)}
                    required
                    className="textarea textarea-bordered w-full bg-[#2b3a4e] border-gray-600 rounded-lg p-3 text-white"
                />
                <button
                    type="submit"
                    className="btn btn-success bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Create
                </button>
              </form>
            </div>
        )}

        {loading ? (
            <p className="text-center text-gray-400">Loading organisations...</p>
        ) : organisations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organisations.map((org) => (
                  <div
                      key={org._id}
                      className="bg-[#1F2937] rounded-xl p-6 flex flex-col justify-between hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer"
                      onClick={() => navigate(`/organisation/${org._id}/classes`)}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="text-indigo-400" size={24} />
                        <h2 className="text-xl font-bold text-white truncate">{org.name}</h2>
                      </div>
                      <p className="text-gray-400 text-sm h-16">{org.description}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                          onClick={(e) => handleDeleteOrganisation(e, org._id)}
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
              <h2 className="text-xl font-semibold text-white">No organisations found</h2>
              <p className="text-gray-400 mt-2">Get started by creating a new organisation.</p>
            </div>
        )}
      </div>
  );
};

export default Organisation;
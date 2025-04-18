
import React, { useState, useContext, useEffect } from "react";
import { Plus, X } from "lucide-react";
import organisationContext from "../context/organisations/organisationContext";

const Organisation = () => {
  const { fetchOrganisations, createOrganisation } = useContext(organisationContext);
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true); // Trigger to reload organisations

  // Fetch organisations when the component is rendered or when `shouldFetch` changes
  useEffect(() => {
    const loadOrganisations = async () => {
      if (shouldFetch) {
        try {
          setLoading(true);
          const data = await fetchOrganisations();
          setOrganisations(data || []); // Ensure data is an array
        } catch (err) {
          setError("Failed to fetch organisations");
        } finally {
          setLoading(false);
          setShouldFetch(false); // Reset the fetch trigger
        }
      }
    };

    loadOrganisations();
  }, [shouldFetch, fetchOrganisations]);

  // Handle creating a new organisation
  const handleCreateOrganisation = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      await createOrganisation({
        name: newOrgName,
        description: newOrgDescription,
      });
      setNewOrgName("");
      setNewOrgDescription("");
      setShowForm(false);
      setShouldFetch(true); // Trigger re-fetch of organisations
    } catch (err) {
      setError("Failed to create organisation");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && <div className="alert alert-error shadow-lg mb-4">{error}</div>}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organisations</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn btn-primary flex items-center gap-2"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {showForm ? "Cancel" : "New"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateOrganisation}
          className="bg-base-200 p-4 rounded-lg shadow-md mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Organisation Name"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Organisation Description"
            value={newOrgDescription}
            onChange={(e) => setNewOrgDescription(e.target.value)}
            required
            className="textarea textarea-bordered w-full"
          />
          <button
            type="submit"
            disabled={creating}
            className={`btn btn-success ${creating ? "loading" : ""}`}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading organisations...</div>
      ) : organisations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organisations.map((org, index) => (
            <div
              key={org._id || index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">{org.name || "Untitled"}</h2>
                <p>{org.description || "No Description Available"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No organisations found</div>
      )}
    </div>
  );
};

export default Organisation;
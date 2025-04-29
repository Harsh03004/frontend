import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Plus, X } from "lucide-react";
import organisationContext from "../context/organisations/organisationContext";
import ClassesContext from "../context/classes/classesContext";


const Organisation = () => {
  const { fetchOrganisations, createOrganisation, deleteOrganisation } = useContext(organisationContext);
  const { fetchClasses } = useContext(ClassesContext);
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  const hasFetched = useRef(false); // 👈 this is the important line

  const loadOrganisations = async () => {
    if (hasFetched.current) return; // ✅ Prevent double fetch
    hasFetched.current = true; // ✅ Mark as fetched
    try {
      setLoading(true);
      const data = await fetchOrganisations();
      setOrganisations(data || []);
    } catch (err) {
      setError("Failed to fetch organisations");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadOrganisations();
    // eslint-disable-next-line
  }, [ shouldFetch, fetchOrganisations ]); // Fetch organisations when the component is rendered or when `shouldFetch` changes

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
      hasFetched.current = false;
      await loadOrganisations();
      setShouldFetch(true);
    } catch (err) {
      setError("Failed to create organisation");
    } finally {
      setCreating(false);
    }
  };

  const handleNavigateToClasses = (organisationId) => {
    fetchClasses(organisationId); // Fetch classes for the selected organisation
    navigate(`/organisation/${organisationId}/classes`); // Navigate to the classes page
  };

  const handleDeleteOrganisation = async (organisationId) =>{
    console.log("Deleting organisation with ID:", organisationId);  
    try{
      setLoading(true);
      await deleteOrganisation(organisationId);
      setOrganisations((prev) => prev.filter((org) => org._id !== organisationId));
      setShouldFetch(true);
    }
    catch (err) {
      setError("Failed to delete organisation");
    } finally {
      setLoading(false);
    }
  }
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
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //   {organisations.map((org, index) => (
        //     <div
        //       key={org._id || index}
        //       className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        //       onClick={() => handleNavigateToClasses(org._id)} // Navigate to classes when clicked
        //     >
        //       <div className="card-body">
        //         <h2 className="card-title">{org.name || "Untitled"}</h2>
        //         <p>{org.description || "No Description Available"}</p>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {organisations.map((org, index) => (
    <div
      key={org._id || index}
      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleNavigateToClasses(org._id)} // Navigate to classes when the card is clicked
    >
      <div className="card-body">
        <h2 className="card-title">{org.name || "Untitled"}</h2>
        <p>{org.description || "No Description Available"}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-error btn-sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from propagating to the card
              handleDeleteOrganisation(org._id); // Call the delete function
            }}
          >
            Delete
          </button>
        </div>
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
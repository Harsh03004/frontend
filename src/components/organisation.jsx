import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

const Organisation = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgDescription, setNewOrgDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchOrganisations = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const username = localStorage.getItem("username");

      if (!accessToken) {
        setError("No access token or username found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/v1/users/organizations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch organisations");
        }

        const data = await response.json();
        setOrganisations(data.data || []);
      } catch (err) {
        setError("Failed to fetch organisations");
      } finally {
        setLoading(false);
      }
    };

    fetchOrganisations();
  }, []);

  const handleCreateOrganisation = async (e) => {
    e.preventDefault();
    setCreating(true);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("No access token found");
      setCreating(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/createOrganization", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newOrgName, description: newOrgDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to create organisation");
      }

      const data = await response.json();
      setOrganisations((prev) => [...prev, data.organization]);
      setNewOrgName("");
      setNewOrgDescription("");
      setShowForm(false);
    } catch (err) {
      setError("Failed to create organisation");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organisations</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {showForm ? "Cancel" : "New"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateOrganisation}
          className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Organisation Name"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Organisation Description"
            value={newOrgDescription}
            onChange={(e) => setNewOrgDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={creating}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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
            <div key={org._id || index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-bold mb-2">{org.name || "Untitled"}</h2>
              <p className="text-gray-600">{org.description || "No Description Available"}</p>
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

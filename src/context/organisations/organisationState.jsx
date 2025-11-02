import { useState, useEffect } from 'react';
import organisationContext from "./organisationContext";
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom'; 


const OrganisationState = (props) => {
    const host = import.meta.env.VITE_API_URL;
    const [organisations, setOrganisations] = useState([]);

    const fetchOrganisations = async () => {
        try {
            console.log("Fetching organisations...");
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                toast.error("No access token found. Please log in.");
                return [];
            }
    
            const response = await fetch(`${host}/api/v1/organisation/getOrganizations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            if (response.status === 200) {
                toast.success("Organisations fetched successfully");
                return data.data; // Return the fetched organizations
            } else {
                toast.error("Failed to fetch organisations");
                return [];
            }
        } catch (error) {
            console.error("Error fetching organisations:", error);
            toast.error(error.message || "Error fetching organisations");
            return [];
        }
    };

    const createOrganisation = async (organisation) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("No access token found");
            }
    
            const response = await fetch(`${host}/api/v1/organisation/createOrganization`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(organisation),
            });
    
            const result = await response.json();
            console.log("API Response:", result); // Log the full API response for debugging
    
            if (response.status === 200) {
                const newOrganisation = result.data; // Extract the organisation data from the `data` property
                if (!newOrganisation || !newOrganisation.name) {
                    console.error("Invalid organisation data:", newOrganisation); // Log invalid data
                    throw new Error("Invalid organisation data received from the server");
                }
                setOrganisations((prevOrganisations) => [...prevOrganisations, newOrganisation]);
                toast.success("Organisation created successfully");
            } else {
                toast.error(result.message || "Organisation creation failed");
            }
        } catch (error) {
            console.error("Error creating organisation:", error);
            toast.error(error.message || "Error creating organisation");
        }
    };


    const deleteOrganisation = async (organisationId) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("No access token found");
            }
    
            const response = await fetch(`${host}/api/v1/organisation/deleteOrganisation/${organisationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("API Response:", response); // Log the full API response for debugging
            if (response.status === 200) {
                setOrganisations((prevOrganisations) =>
                    prevOrganisations.filter((org) => org._id !== organisationId)
                );
                toast.success("Organisation deleted successfully");
            } else {
                toast.error("Failed to delete organisation");
            }
        } catch (error) {
            console.error("Error deleting organisation:", error);
            toast.error(error.message || "Error deleting organisation");
        }
    }

    return (
        <organisationContext.Provider value={{ fetchOrganisations, createOrganisation, deleteOrganisation }}>
            {props.children}
        </organisationContext.Provider>
    );
};

export default OrganisationState;
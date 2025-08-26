import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import organisationContext from "../context/organisations/organisationContext";
import ClassesContext from "../context/classes/classesContext"; // Import ClassesContext
import { User, Mail, Building2, BookOpen, Check, Clock } from "lucide-react";

// StatCard component remains the same
const StatCard = ({ icon, value, label }) => (
    <div className="bg-[#111827] p-4 rounded-lg text-center">
      <div className="flex justify-center items-center mb-2">
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
);

function Profile() {
  const { id, updateAvatar, checkRefreshToken, userDetail, fetchInvites } = useContext(userContext);
  const { fetchOrganisations } = useContext(organisationContext);
  const { fetchClasses } = useContext(ClassesContext); // Use ClassesContext
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    organizations: 0,
    classes: 0,
    invitesReceived: 0,
    invitesAccepted: 0,
    invitesPending: 0,
  });
  const [profileImage, setProfileImage] = useState(id?.avatar);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const hasRun = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      await checkAndRefreshToken();

      // Fetch organizations and then fetch classes for each
      const orgs = await fetchOrganisations();
      if (orgs && orgs.length > 0) {
        let classCount = 0;
        const classPromises = orgs.map(org => fetchClasses(org._id));
        const classesPerOrg = await Promise.all(classPromises);

        classesPerOrg.forEach(classGroup => {
          if(classGroup && classGroup.classes) {
            classCount += classGroup.classes.length;
          }
        });

        setStats(prev => ({ ...prev, organizations: orgs.length, classes: classCount }));
      }

      // Fetch invites and calculate stats
      const invites = await fetchInvites();
      if (invites) {
        setStats(prev => ({
          ...prev,
          invitesReceived: invites.length,
          invitesAccepted: invites.filter(i => i.status === 'Accepted').length,
          invitesPending: invites.filter(i => i.status === 'Pending').length,
        }));
      }
    };

    if (!hasRun.current) {
      hasRun.current = true;
      fetchData();
    }
  }, []);

  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== undefined) {
      await userDetail();
      return;
    }
    checkRefreshToken();
  };

  useEffect(() => {
    if (id?.avatar) {
      setProfileImage(id.avatar);
    }
  }, [id?.avatar]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
      setIsUpdatingProfile(true);
      await updateAvatar(file);
      setIsUpdatingProfile(false);
    }
  };

  return (
      <div className="bg-[#111827] text-gray-200 font-sans w-full p-10">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="text-gray-400 mt-2 mb-8">Your profile information</p>

        <div className="bg-[#1F2937] p-6 rounded-xl flex items-center space-x-6 mb-8">
          <div className="relative flex-shrink-0">
            <img
                className="w-24 h-24 rounded-full object-cover"
                src={profileImage || "/avatar.png"}
                alt="Profile"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-gray-600 hover:bg-gray-500 text-xs p-1 rounded-full cursor-pointer">
              Change
              <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{id?.fullname || "N/A"}</h2>
              <p className="text-gray-400">@{id?.username || "N/A"}</p>
            </div>
            <div className="flex items-start md:items-center pt-2">
            <span className="ml-auto bg-green-500 text-green-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Active
            </span>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <div className="flex items-center justify-between">
                <p className="text-white">{id?.email || "N/A"}</p>
                {/*This feature is under review and can be added later.*/}
                {/*<a href="#" className="text-sm text-indigo-400 hover:underline">*/}
                {/*  change Email*/}
                {/*</a>*/}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1F2937] p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-6">Activity & Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard icon={<Building2 className="text-purple-400" />} value={stats.organizations} label="Organisations" />
            <StatCard icon={<BookOpen className="text-blue-400" />} value={stats.classes} label="Classes" />
            <StatCard icon={<Mail className="text-yellow-400" />} value={stats.invitesReceived} label="Invites Received" />
            <StatCard icon={<Check className="text-green-400" />} value={stats.invitesAccepted} label="Accepted" />
            <StatCard icon={<Clock className="text-orange-400" />} value={stats.invitesPending} label="Pending" />
          </div>
          {/*This feature is under review and can be added later.*/}
          {/*<div className="flex justify-end space-x-4">*/}
          {/*  <button className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold">*/}
          {/*    Edit Profile*/}
          {/*  </button>*/}
          {/*  <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold">*/}
          {/*    Save Changes*/}
          {/*  </button>*/}
          {/*</div>*/}
        </div>
      </div>
  );
}

export default Profile;
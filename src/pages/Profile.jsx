import React, { useState } from "react";
import "../Styles/Profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-card">
        <div className="profile-image-container">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
        </div>
        <label htmlFor="file-upload" className="file-upload-label">
          Upload Profile Picture
        </label>
        <input
          type="file"
          id="file-upload"
          className="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="profile-info">
        <p>Full Name: <span>John Doe</span></p>
        <p>Username: <span>johndoe123</span></p>
        <p>Email: <span>johndoe@example.com</span></p>
      </div>
    </div>
  );
};

export default Profile;

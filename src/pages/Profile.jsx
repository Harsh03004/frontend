import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.css";

const Profile = () => {

  let navigate = useNavigate();
  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken!==undefined) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/refreshToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
      });
      console.log('Response:', response);
        console.log("------------------")
      if (response.status === 200) {
        const json = await response.json();
        
        console.log('Response JSON:', json);
        console.log("------------------")
        console.log("access token= "+json.data.accessToken);
        if(json.data.accessToken===undefined){
          navigate("/login");
          return;
        }
        localStorage.setItem('accessToken', json.data.accessToken);
        localStorage.setItem('refreshToken', json.data.refreshToken);
        return;
      } else {
        navigate("/login");
      }
      
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
    // work like documentdidmount
    useEffect(() => {
      checkAndRefreshToken();
        // eslint-disable-next-line
    }, [])



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

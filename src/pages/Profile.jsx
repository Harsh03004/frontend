import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.css";
import userContext from '../context/user/userContext';
import Navbar from "../components/navbar";

function Profile() {
  const { id, updateAvatar, checkRefreshToken, userDetail } = useContext(userContext);


  let navigate = useNavigate();
  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken !== undefined) {
      userDetail();
      return;
    }
    checkRefreshToken();
  };


  const hasRun = useRef(false);
  // work like documentdidmount
  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      checkAndRefreshToken();
    }
    // eslint-disable-next-line
  }, []);



  const [profileImage, setProfileImage] = useState(id?.avatar);
  useEffect(() => {
    console.log("Updating profileImage:", id.avatar);
    setProfileImage(id.avatar);
  }, [id.avatar]);


  // not working fine need to work on it
  // const handleImageUpload = async (event) => {
  //   console.log(event.target.files)
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setProfileImage(e.target.result);
  //     reader.readAsDataURL(file);
  //     console.log(file)
  //     const json = await updateAvatar(file);
  //     // console.log("res")
  //     // console.log(response)
  //     // console.log(response.data);
  //     if (response.data.avatar) {
  //     //   console.log("response data")
  //     //   console.log(response.data);
  //       setProfileImage(response.data.avatar);
  //     }
  //     // setProfileImage(id.avatar)
  //   }
  // };
  const handleImageUpload = async (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
      console.log(file);

      const response = await updateAvatar(file);
      console.log("Response:", response);

      if (response?.data?.avatar) {
        console.log("Updated Avatar URL:", response.data.avatar);
        setProfileImage(response.data.avatar);
      }
    }
  };


  return (
    <>
      <Navbar />
      <div className="dis">
        <div className="profile-container">
          <h1 className="profile-title">Profile</h1>
          <div className="profile-card">
            <div className="profile-image-container">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
                // <img src={profileImage? profileImage:""} alt="Profile" className="profile-image" />
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
              onChange={handleImageUpload} />
          </div>
          <div className="profile-info">
            <p>Full Name: <span>{id?.fullname}</span></p>
            <p>Username: <span>{id?.username}</span></p>
            <p>Email: <span>{id?.email}</span></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

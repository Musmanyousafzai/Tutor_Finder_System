import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import "./Profile.scss";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [profileData, setProfileData] = useState(null);
  const [myGigs, setMyGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser?.isSeller) {
      const fetchMyGigs = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get("/api/Gigs", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMyGigs(response.data);
        } catch (error) {
          console.error("Error fetching user gigs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMyGigs();
    }

    fetchUserProfileData();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile">
        {/* Welcome Section (Left Side) */}
        <div className="welcome-section">
        <span className="role-badge">
            {currentUser?.isSeller ? "Tutor" : "Student"}
          </span>
          <h1>Welcome to Tutor Finder, {currentUser?.username}!</h1>
          <p>{currentUser?.isSeller ? "Your expertise is the key to unlocking student success!" : ""}</p>
         
        </div>

        {/* Profile Details Section (Right Side) */}
        <div className="profile-details">
          <div className="profile-picture-container">
            <img
              src={currentUser.img || "/img/noavatar.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <div className="profile-info">
            <p><strong>Username:</strong> {currentUser?.username}</p>
            <p><strong>Email:</strong> {currentUser?.email}</p>
            <p><strong>Country:</strong> {currentUser?.country}</p>
            <p><strong>Bio:</strong> {profileData?.bio}</p>
          </div>

          {/* Tutor or Student Specific Details */}
          {currentUser?.isSeller ? (
            <div className="tutor-details">
              <p><strong>Subjects:</strong> {profileData?.subjects?.join(", ")}</p>
              <p><strong>Experience:</strong> {profileData?.experience} years</p>
            </div>
           
          ) : (
            <div className="student-details">
              <p><strong>Learning Goals:</strong> {profileData?.learningGoals}</p>
            </div>
          )}
           <button className="edit-profile-btn">Edit Profile</button>
        </div>
       
      </div>

      {/* Gigs or Student Section Below */}
      {currentUser?.isSeller ? (
        <div className="gigs-section">
          <h2>My Gigs</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : myGigs.length > 0 ? (
            myGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
          ) : (
            <p>No gigs found.</p>
          )}
        </div>
      ) : (
        <div className="student-section">
          <h2>Your Learning Plan</h2>
          <p>{profileData?.learningPlan || "No specific plan set yet."}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

// import React, { useState, useEffect } from "react";
// import "./EditProfileModal.scss";

// const EditProfileModal = ({ currentUser, profileData, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     username: profileData?.username || "",
//     email: profileData?.email || "",
//     bio: profileData?.bio || "",
//     subjects: profileData?.subjects || [],
//     learningGoals: profileData?.learningGoals || "",
//     profilePicture: profileData?.profilePicture || "", // Store the profile picture file
//   });
//   const [profilePicturePreview, setProfilePicturePreview] = useState(profileData?.profilePicture || "");

//   useEffect(() => {
//     setFormData({
//       username: profileData?.username || "",
//       email: profileData?.email || "",
//       bio: profileData?.bio || "",
//       subjects: profileData?.subjects || [],
//       learningGoals: profileData?.learningGoals || "",
//       profilePicture: profileData?.profilePicture || "",
//     });
//     setProfilePicturePreview(profileData?.profilePicture || "");
//   }, [profileData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Create a preview URL for the selected image
//       setProfilePicturePreview(URL.createObjectURL(file));
//       setFormData((prev) => ({
//         ...prev,
//         profilePicture: file, // Store the file in formData
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = new FormData();

//     // Append text data
//     updatedData.append("username", formData.username);
//     updatedData.append("email", formData.email);
//     updatedData.append("bio", formData.bio);
//     updatedData.append("subjects", formData.subjects.join(","));
//     updatedData.append("learningGoals", formData.learningGoals);

//     // Append the profile picture file if it exists
//     if (formData.profilePicture instanceof File) {
//       updatedData.append("profilePicture", formData.profilePicture);
//     }

//     onSave(updatedData);  // Pass the FormData to the parent component
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="edit-profile-modal">
//         <h2>Edit Profile</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Username:
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Bio:
//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//             />
//           </label>
//           {currentUser.isSeller && (
//             <label>
//               Subjects (comma-separated):
//               <input
//                 type="text"
//                 name="subjects"
//                 value={formData.subjects.join(", ")}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     subjects: e.target.value.split(",").map((s) => s.trim()),
//                   })
//                 }
//               />
//             </label>
//           )}
//           {!currentUser.isSeller && (
//             <label>
//               Learning Goals:
//               <textarea
//                 name="learningGoals"
//                 value={formData.learningGoals}
//                 onChange={handleChange}
//               />
//             </label>
//           )}
//           <label>
//             Profile Picture:
//             <input
//               type="file"
//               name="profilePicture"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             {profilePicturePreview && (
//               <div className="profile-picture-preview">
//                 <img
//                   src={profilePicturePreview}
//                   alt="Profile Picture Preview"
//                   className="profile-picture"
//                 />
//               </div>
//             )}
//           </label>

//           <div className="modal-actions">
//             <button type="button" onClick={onClose}>Cancel</button>
//             <button type="submit">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;

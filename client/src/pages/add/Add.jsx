import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/icons/loader.svg";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/myGigs"); // Redirect to user's gigs after successful submission
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Handle adding features
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  // Handle file uploads
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      setUploading(false);
      console.error(err);
    }
  };

  // Handle category and subcategory changes
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(""); // Reset subcategory when category changes

    const subcategoriesData = {
      Science: ["Biology", "Chemistry", "Physics", "Earth Science", "Environmental Science"],
      Arts: ["Music", "Visual Arts", "Dance", "Theater", "Literature"],
      Social_Studies: ["Geography", "Economics", "Civics", "Psychology", "Sociology"],
      Computer_Science: ["Programming", "Web Development", "Data Science", "Cybersecurity"],
      Languages: ["English", "Spanish", "French", "Chinese", "Arabic"],
      Math: ["Algebra", "Geometry", "Calculus", "Trigonometry", "Statistics"],
      History: ["World History", "American History", "European History"],
    };

    setSubcategories(subcategoriesData[event.target.value] || []);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  // Submit form data
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    mutation.mutate(state);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form onSubmit={handleSubmit}>
          <div className="sections">
            {/* Basic Gig Info */}
            <div className="info">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
                required
              />

              {/* Category and Subcategory */}
              <label htmlFor="category">Academic Subjects</label>
              <select name="category" id="category" onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {["Science", "Arts", "Social_Studies", "Computer_Science", "Languages", "Math", "History"].map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
                )}
              </select>

              {subcategories.length > 0 && (
                <select
                  name="subcategory"
                  id="subcategory"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              )}

              {/* Tutoring Style */}
              <label htmlFor="approaches">Select Tutoring Styles</label>
              <select name="approaches" id="approaches" onChange={handleChange} required>
                <option value="">Select Category</option>
                {["One_on_One_Tutoring", "Online_Tutoring", "Test_Preparation", "Group_Tutoring", "In_Person_Tutoring", "Homework_Help"].map(
                  (style) => (
                    <option key={style} value={style}>
                      {style.replace("_", " ")}
                    </option>
                  )
                )}
              </select>

              {/* Image Upload */}
              <div className="images">
                <label htmlFor="cover">Cover Image</label>
                <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} required />
                <label htmlFor="images">Upload Images</label>
                <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
                <button type="button" onClick={handleUpload}>
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>

              {/* Gig Description */}
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                placeholder="Brief descriptions to introduce your service to customers"
                rows="10"
                onChange={handleChange}
                required
              ></textarea>

              {/* Submit Button */}
              <button type="submit" className="loading">
                {loading ? <img src={loader} alt="loading" className="loader-img" /> : "Create"}
              </button>
            </div>

            {/* Gig Details */}
            <div className="details">
              <label htmlFor="shortTitle">Service Title</label>
              <input
                type="text"
                name="shortTitle"
                placeholder="e.g. One-page web design"
                onChange={handleChange}
                required
              />

              <label htmlFor="shortDesc">Short Description</label>
              <textarea
                name="shortDesc"
                onChange={handleChange}
                placeholder="Short description of your service"
                rows="5"
                required
              ></textarea>

              <label htmlFor="Duration">Duration (In Months)</label>
              <input type="number" name="Duration" onChange={handleChange} required />

              <label htmlFor="revisionNumber">Revision Number</label>
              <input type="number" name="revisionNumber" onChange={handleChange} required />

              <label htmlFor="features">Add Features</label>
              <form onSubmit={handleFeature}>
                <input type="text" placeholder="e.g. page design" required />
                <button type="submit">Add</button>
              </form>
              <div className="addedFeatures">
                {state.features?.map((feature) => (
                  <div className="item" key={feature}>
                    <button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: feature })}>
                      {feature} <span>X</span>
                    </button>
                  </div>
                ))}
              </div>

              <label htmlFor="price">Price</label>
              <input type="number" name="price" onChange={handleChange} required />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

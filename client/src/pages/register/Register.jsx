import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/icons/loader.svg";

function Register() {
  const [userType, setUserType] = useState("client"); // Initial user type is client
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false, // Default to client initially
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUserType(e.target.value === "seller" ? "seller" : "client");
    setUser((prev) => {
      return { ...prev, isSeller: e.target.value === "seller" };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setErrors(errors); // Update state with validation errors
    if (Object.keys(errors).length > 0) {
      return; // Prevent form submission if errors exist
    }
    setLoading(true);
    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const validateForm = (user) => {
    const errors = {};
    if (!user.username) {
      errors.username = "Username is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Invalid email format";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    //  more validation will be added here.... hint for me: (password complexity is left)
    return errors;
  };

  // Conditional rendering of form fields based on userType
  const renderFormFields = () => {
    if (userType === "seller") {
      return (
        <>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </>
      );
    }
    return null;
  };

  return (
    <div className="register">
      <div className="account-type">
        <h2>Join as a Student or Tutor</h2>
        <p>Choose Your Acount Type Here</p>
        <div className="radio-buttons">
          <div className="btn1">
            <label>
              <input
                type="radio"
                name="userType"
                value="client"
                checked={userType === "client"}
                onChange={handleSeller}
              />
              <h4>I am Joining as a Student</h4>
            </label>
          </div>
          <div className="btn2">
            <label>
              <input
                type="radio"
                name="userType"
                value="seller"
                checked={userType === "seller"}
                onChange={handleSeller}
              />
              <h4>I am Joining as a Tutor</h4>
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h2>
            {userType === "client" ? "Register as a Student" : "Register as a Tutor"}
          </h2>
          <label htmlFor="">Username *</label>
          <input
            name="username"
            type="text"
            placeholder="Enter Your Username"
            onChange={handleChange}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
          <label htmlFor="">Email *</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your valid email address"
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label htmlFor="">Password *</label>
          <input name="password" type="password" onChange={handleChange} />
          {errors.password && <p className="error-message">{errors.password}</p>}
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          {errors.country && <p className="error-message">{errors.country}</p>}
          {renderFormFields()}
          <button
            type="submit"
            className="w-full bg-primary/80 hover:bg-primary cursor-pointer outline-none text-white rounded py-3 transition-all duration-300 mt-4 sm:hidden"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <img src={loader} alt="/" className="w-[40px]" />
              </div>
            ) : (
              <p className="flex items-center justify-center gap-2">
                Register
              </p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

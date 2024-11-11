import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss"; 


function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);   

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/"); 

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link 
            className="link" to="/">
            <span className="text">Tutor Finder</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>TF Business</span>
          <span>About Us</span>
          <span>English</span>
          {currentUser ? (
            <div 
              className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                   
                      <Link className="link" to="/myGigs">
                        Gigs 

                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                   <Link className="link" to="/profile">
                         Profile 

                      </Link>
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div> 

              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/register">
                 <span>Become A Tutor</span>
              </Link>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
            &nbsp;&nbsp; One-on-One Tutoring
            </Link>
            <Link className="link menuLink" to="/">
            Group Tutoring
            </Link>
            <Link className="link menuLink" to="/">
            Online Tutoring
            </Link>
            <Link className="link menuLink" to="/">
            In-Person Tutoring
            </Link>
            <Link className="link menuLink" to="/">
            Test Prep
            </Link>
            <Link className="link menuLink" to="/">
           Homework Help &nbsp; &nbsp;
            </Link>
           
          </div>
          <hr/>
        </>
      )}
    </div>
  );
}

export default Navbar; 
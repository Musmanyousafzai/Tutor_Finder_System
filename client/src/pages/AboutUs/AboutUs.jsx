import React from "react";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="navbar">
        <div className="container">
          <h1 className="logo">Tutor Finder</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>About Tutor Finder</h2>
          <p>
            Tutor Finder is an innovative platform designed to connect students with qualified tutors across a variety of subjects. We aim to provide students with the best tutors for their needs, while helping tutors expand their reach and grow their careers.
          </p>
        </section>

        <section className="about-section">
          <h3>Our Vision</h3>
          <p>
            To create an inclusive and effective learning environment where students can find tutors who cater to their individual learning needs, bridging the gap between students and tutors.
          </p>
        </section>

        <section className="features">
          <div className="feature-item">
            <i className="fas fa-search"></i>
            <h4>Easy Search</h4>
            <p>Filter tutors by subjects, expertise, and price range.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-comments"></i>
            <h4>Seamless Communication</h4>
            <p>Engage directly with tutors for better collaboration.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-star"></i>
            <h4>Trusted Reviews</h4>
            <p>Read reviews to make an informed decision.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-lock"></i>
            <h4>Secure Payments</h4>
            <p>Secure payment processing for hassle-free transactions.</p>
          </div>
        </section>

        <section className="team">
          <h3>Our Team</h3>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h4>John Doe</h4>
            <p>CEO & Founder</p>
            <p>Passionate about education and technology, John started Tutor Finder to help students and tutors connect.</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h4>Jane Smith</h4>
            <p>Product Manager</p>
            <p>Jane oversees the development and user experience of the platform.</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" />
            <h4>Michael Brown</h4>
            <p>Lead Developer</p>
            <p>Michael leads the development of the website, ensuring smooth functionality and performance.</p>
          </div>
        </section>
      </div>

      <footer>
        <div className="container">
          <p>&copy; 2024 Tutor Finder System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;

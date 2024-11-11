import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="categories-container">
            <div className="category-column">
              <ul>
                <li>
                  <h2>Computer Science</h2>
                  <ul className="subcategories">
                    <li><span>Programming</span></li>
                    <li><span>Web Development</span></li>
                    <li><span>Data Science</span></li>
                    <li><span>Cybersecurity</span></li>
                  </ul>
                </li>
                <li>
                  <h2>Languages</h2>
                  <ul className="subcategories">
                    <li><span>English</span></li>
                    <li><span>Spanish</span></li>
                    <li><span>French</span></li>
                    <li><span>Chinese</span></li>
                    <li><span>Arabic</span></li>
                  </ul>
                </li>
                <li>
                  <h2>History</h2>
                  <ul className="subcategories">
                    <li><span>World History</span></li>
                    <li><span>American History</span></li>
                    <li><span>European History</span></li>
                  </ul>
                </li>
                <li>
                  <h2>Social Studies</h2>
                  <ul className="subcategories">
                    <li><span>Geography</span></li>
                    <li><span>Economics</span></li>
                    <li><span>Civics</span></li>
                    <li><span>Psychology</span></li>
                    <li><span>Sociology</span></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="category-column">
              <ul>
                <li>
                  <h2>Arts</h2>
                  <ul className="subcategories">
                    <li><span>Music</span></li>
                    <li><span>Visual Arts</span></li>
                    <li><span>Dance</span></li>
                    <li><span>Theater</span></li>
                    <li><span>Literature</span></li>
                  </ul>
                </li>
                <li>
                  <h2>Math</h2>
                  <ul className="subcategories">
                    <li><span>Algebra</span></li>
                    <li><span>Geometry</span></li>
                    <li><span>Calculus</span></li>
                    <li><span>Trigonometry</span></li>
                    <li><span>Statistics</span></li>
                  </ul>
                </li>
                <li>
                  <h2>Science</h2>
                  <ul className="subcategories">
                    <li><span>Biology</span></li>
                    <li><span>Chemistry</span></li>
                    <li><span>Physics</span></li>
                    <li><span>Earth Science</span></li>
                    <li><span>Environmental Science</span></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-links">
            <div className="item">
              <h2>About</h2>
              <Link to="/press">Press & News</Link>
              <Link to="/partnerships">Partnerships</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/ip-claims">Intellectual Property Claims</Link>
              <Link to="/investor-relations">Investor Relations</Link>
              <Link to="/contact-sales">Contact Sales</Link>
            </div>
            <div className="item">
              <h2>Support</h2>
              <Link to="/help-support">Help & Support</Link>
              <Link to="/trust-safety">Trust & Safety</Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>TutorFinder</h2>
            <span>© 2023 TutorFinder</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <img src="/img/pinterest.png" alt="Pinterest" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="Language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="Currency" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

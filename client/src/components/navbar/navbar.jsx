// components/navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDark ? "navbar-dark bg-dark" : "navbar-light bg-white"
      } shadow-sm px-4 py-2`}
    >
      <>
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img
            src="logo.png"
            alt="LBD"
            style={{
              height: "60px",
              width: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>
      </>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav gap-3 align-items-center">
          {/* Hoverable cards */}
          <li className="nav-item dropdown nav-hover-card">
            <span className="nav-link dropdown-toggle" id="homeDropdown">
              Home
            </span>
            <div className="dropdown-menu card p-3 shadow">
              <Link className="dropdown-item" to="/">
                Overview
              </Link>
              <Link className="dropdown-item" to="/news">
                News
              </Link>
            </div>
          </li>

          <li className="nav-item dropdown nav-hover-card">
            <span className="nav-link dropdown-toggle" id="servicesDropdown">
              Categories
            </span>
            <div className="dropdown-menu card p-3 shadow">
              <Link className="dropdown-item" to="/web">
                E-Commerce
              </Link>
              <Link className="dropdown-item" to="/mobile">
                Physical Shops
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>

          {/* Search input */}
          <li className="nav-item">
            <div className="search-container">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search..."
              />
            </div>
          </li>

          {/* Theme toggle */}
          <li className="nav-item">
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

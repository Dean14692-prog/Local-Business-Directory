import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./SignupForm.css";

export function SignupForm({ isDark }) {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    setFormData({
      ...formData,
      [inputId]: inputValue,
    });
  };

  const showPopup = (text, type = "success") => {
    setPopupMessage({ text, type });
    setTimeout(() => setPopupMessage(""), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirmpassword } = formData;

    if (isSignup) {
      if (password !== confirmpassword) {
        showPopup("Passwords do not match", "error");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/users");
        const allUsers = await res.json();

        const userExists = allUsers.some((user) => user.email === email);

        if (userExists) {
          showPopup("Account already exists. Please log in.", "error");
          setIsSignup(false);
          return;
        }

        const signupRes = await fetch("http://localhost:4000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname, email, password }),
        });

        if (signupRes.ok) {
          showPopup("Signup successful!", "success");
          setFormData({
            fullname: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
          setIsSignup(false);
        } else {
          showPopup("Signup failed. Try again.", "error");
        }
      } catch (err) {
        console.error("Signup error:", err);
        showPopup("Signup failed due to a network or server error.", "error");
      }
    } else {
      try {
        const res = await fetch("http://localhost:4000/users");
        const users = await res.json();

        const match = users.find(
          (user) => user.email === email && user.password === password
        );

        if (match) {
          showPopup("Login successful!", "success");
          setFormData({
            fullname: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
        } else {
          showPopup("Invalid email or password", "error");
        }
      } catch (err) {
        console.error("Login error:", err);
        showPopup("Login failed due to a network or server error.", "error");
      }
    }
  };

  return (
    <div className={`signup-page ${isDark ? "dark-bg" : ""}`}>
      <div className={`form-container ${isDark ? "dark" : ""}`}>
        <h2 className="form-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="form-subtitle">
          {isSignup ? "Join us today" : "Login to your account"}
        </p>

        <div className="form-tabs">
          <button
            className={`form-tab ${!isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
          <button
            className={`form-tab ${isSignup ? "active" : ""}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              fullWidth
              margin="normal"
              size="small"
              id="fullname"
              label="Full Name"
              variant="outlined"
              type="text"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            size="small"
            id="email"
            label="Email Address"
            variant="outlined"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            size="small"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {isSignup && (
            <TextField
              fullWidth
              margin="normal"
              size="small"
              id="confirmpassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          )}
          <button className="submit-btn" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {popupMessage && (
          <div className={`popup-alert ${popupMessage.type}`}>
            {popupMessage.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupForm;

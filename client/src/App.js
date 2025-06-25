import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import SignupForm from "./components/signup/signup";
import LandingPage from "./components/LandingPage";
import About from "./components/footer/about";
import Contact from "./components/footer/contact";
import PrivacyPolicy from "./components/footer/privacypolicy";
import SourcePage from "./components/source/sourcepage";
import SourceFilter from "./components/source/sourcefilter";
import Categories from "./components/Categories";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Router>
      <div className={`App ${isDark ? "dark" : ""}`}>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<LandingPage isDark={isDark} />} />
          <Route path="/signup" element={<SignupForm isDark={isDark} />} />
          <Route path="/about" element={<About isDark={isDark} />} />
          <Route path="/contact" element={<Contact isDark={isDark} />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy isDark={isDark} />}
          />
          <Route path="/source" element={<SourcePage isDark={isDark} />} />
          <Route
            path="/source-filter"
            element={<SourceFilter isDark={isDark} />}
          />
          <Route path="/categories" element={<Categories isDark={isDark} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

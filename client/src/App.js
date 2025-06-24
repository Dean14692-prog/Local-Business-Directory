// App.js
import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import SignupForm from "./components/signup /signup";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`App ${isDark ? "dark" : ""}`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <SignupForm isDark={isDark} />
    </div>
  );
}

export default App;

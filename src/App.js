import { useState } from "react";
import "./App.css";
import SignUp from "./components/pages/SignUp";
import LoginUp from "./components/pages/LoginUp";
import { Routes, Route } from "react-router-dom";
import VacancyWrapper from "./components/VacancyWrapper";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vacancy" element={<VacancyWrapper />} />
      </Routes>
    </div>
  );
}

export default App;

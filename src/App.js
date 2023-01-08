import { useState } from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import LoginUp from "./pages/LoginUp";
import { Routes, Route } from "react-router-dom";
import VacancyWrapper from "./pages/VacancyWrapper";
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

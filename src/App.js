import React, { useEffect } from "react";
import SignUp from "./pages/SignUp";
import LoginUp from "./pages/LoginUp";
import VacancyWrapper from "./pages/VacancyWrapper";
import { Routes, Route } from "react-router-dom";
import Payment from "./components/Payment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Info from "./components/Info";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginUp />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vacancy/:type" element={<VacancyWrapper />} />
        <Route path="/info" element={<Info />} />
        <Route path="/payment/:orderId" element={<Payment />} />
        <Route path="*" element={<>404 Page</>} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

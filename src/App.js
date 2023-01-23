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
import SuccessfullPaymentComponent from "./components/SuccessfullPaymentComponent";
import PreviewForm from "./components/PreviewForm";
import ForgetPassword from "./components/ForgetPassword";
import EmailVerification from "./components/EmailVerification";
import ResetPassword from "./components/ResetPassword";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginUp />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/email-verification" element={<EmailVerification />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="*" element={<>404 Page</>} />

        <Route path="/welcome" element={<ProtectedRoute />}>
          <Route path="" element={<WelcomePage />} />
        </Route>

        <Route path="/previewform" element={<ProtectedRoute />}>
          <Route path="" element={<PreviewForm />} />
        </Route>

        <Route path="/vacancy/" element={<ProtectedRoute />}>
          <Route path=":type" element={<VacancyWrapper />} />
        </Route>

        <Route path="/info" element={<ProtectedRoute />}>
          <Route path="" element={<Info />} />
        </Route>

        <Route path="/paymentSuccess" element={<ProtectedRoute />}>
          <Route path="" element={<SuccessfullPaymentComponent />} />
        </Route>

        <Route
          path="/payment/:orderId/:billing_name"
          element={<ProtectedRoute />}
        >
          <Route path="" element={<Payment />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;

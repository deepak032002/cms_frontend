import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/color-logo.jpg";
import { removeToken } from "../../redux/features/authSlice";
import { removeForm } from "../../redux/features/form";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="header flex justify-between items-center py-6 px-3">
      <img className="w-28 h-auto" src={logo} alt="logo" />

      <button
        onClick={() => {
          dispatch(removeToken());
          dispatch(removeForm());
          navigate("/");
        }}
        className="bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-1"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

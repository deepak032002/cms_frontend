import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/color-logo.jpg";
import { removeToken } from "../../redux/features/authSlice";
import { removeForm } from "../../redux/features/form";
import { Link } from "react-router-dom";
import { ImSwitch } from "react-icons/im";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="header flex justify-between items-center py-6 px-3 bg-slate-50">
      <img className="w-28 h-auto" src={logo} alt="logo" />
      <div class="flex justify-center px-6 py-4 items-center">
        <p class="text-gray-700 text-base">
          <Link
            to="/info"
            className="bg-[#45aed6] text-white hover:bg-[#2a95be] rounded-md px-3 py-1 border border-[#2a95be]"
          >
            Click here to Apply
          </Link>
        </p>
      </div>
      <button
        onClick={() => {
          dispatch(removeToken());
          dispatch(removeForm());
          navigate("/");
        }}
        className="flex items-center gap-2 bg-[#00B7C9] text-white hover:bg-red-700 rounded-md px-3 py-1"
      >
        Logout <ImSwitch className="text-red-500 hover:text-white"/>
      </button>
    </div>
  );
};

export default Header;

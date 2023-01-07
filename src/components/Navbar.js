import React from "react";
import color from "../assets/images/color-logo.jpg";
const Nav = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={color} alt="icon" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">About Us</a>
          <a className="mr-5 hover:text-gray-900">Campus</a>
          <a className="mr-5 hover:text-gray-900">School Founders</a>
          <a className="mr-5 hover:text-gray-900">Child Development</a>
          <a className="mr-5 hover:text-gray-900">Events</a>
          <a className="mr-5 hover:text-gray-900">News</a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;

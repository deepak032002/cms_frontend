import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0">
      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-500 opacity-75"></span>
    </div>
  );
};

export default Loader;

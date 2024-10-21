// src/components/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="relative inline-block h-9 w-9 animate-spin">
      <div className="absolute h-full w-1/3 bg-indigo-600 rounded-full bottom-1 left-0 transform rotate-60 origin-bottom">
        <div className="absolute h-0 w-full pb-full bg-indigo-600 rounded-full bottom-0 left-0 animate-wobble1"></div>
      </div>
      <div className="absolute h-full w-1/3 bg-indigo-600 rounded-full bottom-1 right-0 transform rotate-[-60deg] origin-bottom">
        <div className="absolute h-0 w-full pb-full bg-indigo-600 rounded-full bottom-0 left-0 animate-wobble1 animate-delay-75"></div>
      </div>
      <div className="absolute h-full w-1/3 bg-indigo-600 rounded-full bottom-[-5%] left-0 translate-x-[116.666%]">
        <div className="absolute h-0 w-full pb-full bg-indigo-600 rounded-full top-0 left-0 animate-wobble2"></div>
      </div>
    </div>
  );
};

export default Spinner;

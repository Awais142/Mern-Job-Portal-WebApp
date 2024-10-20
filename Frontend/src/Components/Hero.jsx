import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { FaSearch } from "react-icons/fa"; // Import search icon

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 h-screen flex flex-col justify-center items-center px-4">
      {/* Background Beams */}
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Find Your Perfect Job
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span>Start Your Journey Today!</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span>Start Your Journey Today!</span>
            </div>
          </div>
        </h2>
        <div className="relative z-20 mt-8 w-full max-w-2xl">
          <div className="flex items-center border-2 border-gray-300 rounded-lg p-3 shadow-lg bg-white">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              className="w-full focus:outline-none"
              placeholder="Search for jobs"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg ml-4">
              Find Jobs
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Search Bar */}
    </div>
  );
};

export default Hero;

import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { FaSearch } from "react-icons/fa"; // Import search icon

const Hero = () => {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center px-4">
      {/* Background Beams */}
      <BackgroundBeamsWithCollision>
        <div className="text-center relative z-20">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 poppins-bold tracking-tight">
            Find Your Perfect Job
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="text-2xl md:text-4xl lg:text-7xl font-bold text-gray-700 poppins-bold tracking-tight">
                <span>Start Your Journey Today!</span>
              </div>
            </div>
          </h2>

          {/* Search Bar */}
          <div className="relative z-20 mt-8 w-full max-w-2xl mx-auto">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search for jobs"
              />
              <button
                className="bg-gray-500 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg absolute right-1 top-2
              
               "
              >
                Find Jobs
              </button>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Hero;

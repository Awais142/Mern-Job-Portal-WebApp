// src/components/Hero.js (adjust the path as necessary)
import React, { useState } from "react"; // Don't forget to import useState
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { getAllJobs } from "../Services/Api/JobsApi.js"; // Use curly braces for named import
import { Cover } from "./ui/cover.jsx";

const Hero = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getAllJobs({ searchKeyword });
      if (data.success) {
        console.log("Jobs fetched successfully:", data);
        // Handle fetched jobs here (e.g., set state or display)
      }
    } catch (error) {
      console.error("An error occurred while fetching jobs:", error.message);
    }
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <BackgroundBeamsWithCollision>
        <div className="text-center relative z-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 poppins-bold tracking-tight">
            Build your dream career
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="text-2xl md:text-4xl lg:text-7xl font-bold text-gray-700 poppins-bold tracking-tight">
                <span>
                  at <Cover>Rapid speed</Cover>
                </span>
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
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                className="bg-gray-500 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg absolute right-1 top-2"
                onClick={handleSearch}
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

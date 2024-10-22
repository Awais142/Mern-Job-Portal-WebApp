import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { Cover } from "./ui/cover.jsx";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Hero = () => {
  return (
    <div className="relative mt-32 md:mt-0 md:min-h-screen flex flex-col justify-center items-center">
      <BackgroundBeamsWithCollision>
        <div className="text-center relative z-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 poppins-bold tracking-tight">
            Build your dream career
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] mt-4 ">
              <div className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-700 poppins-bold tracking-tight">
                <span>
                  at <Cover>Rapid speed</Cover>
                </span>
              </div>
            </div>
          </h2>

          {/* Browse Jobs and Post a Job Buttons */}
          <div className="relative z-20 mt-8 flex space-x-4 justify-center poppins-bold">
            {/* Browse Jobs Button */}
            <Link
              to="/jobs"
              className="bg-zinc-900 hover:border-2 hover:border-zinc-900 hover:text-black hover:bg-zinc-100 text-white px-6 py-3 rounded-lg font-semibold tracking-tight"
            >
              Browse Jobs
            </Link>

            {/* Post a Job Button */}
            <Link
              to="/post-job"
              className="border-2 border-zinc-500 text-zinc-900 hover:text-white hover:bg-zinc-900 px-6 py-3 rounded-lg font-semibold tracking-tight"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Hero;

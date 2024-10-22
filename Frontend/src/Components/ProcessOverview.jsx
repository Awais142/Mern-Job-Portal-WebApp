import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const ProcessOverview = () => {
  return (
    <section className="how-it-works py-12 px-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-4xl poppins-bold text-center text-gray-600 mb-8">
        How It Works
      </h3>
      <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <div className="card bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105">
          <div className="icon mb-4">
            <LuUserPlus className="text-5xl text-zinc-600 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-3">
            Create an Account
          </h4>
          <p className="text-gray-700 poppins-regular">
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105">
          <div className="icon mb-4">
            <VscTasklist className="text-5xl text-zinc-600 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-3">
            Post or Browse Jobs
          </h4>
          <p className="text-gray-700 poppins-regular">
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105">
          <div className="icon mb-4">
            <BiSolidLike className="text-5xl text-zinc-600 mx-auto" />
          </div>
          <h4 className="text-xl font-semibold text-gray-600 mb-3">
            Hire or Get Hired
          </h4>
          <p className="text-gray-700 poppins-regular">
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;

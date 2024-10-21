import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import useJobStore from "../Store/jobStore";
import { cities, nichesArray } from "../Data/jobsData";
import Card from "../Components/Card";

const Jobs = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");

  const { jobs, loading, error, fetchJobs } = useJobStore();

  // Trigger fetch only when the user clicks the search button or changes filters
  const handleSearch = () => {
    fetchJobs(selectedCity, selectedNiche, searchKeyword);
  };

  // Run useEffect to fetch jobs only when component mounts, or filters change explicitly
  useEffect(() => {
    fetchJobs(selectedCity, selectedNiche, searchKeyword);
  }, [selectedCity, selectedNiche]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs p-8 mt-12">
          {error && <p className="text-red-500">{error}</p>}

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

          <div className="flex flex-col md:flex-row mt-8">
            {/* Sidebar Filters */}
            <div className="filter-bar w-full md:w-1/4 mb-8 md:mb-0 md:mr-4">
              <div className="cities mb-8">
                <h2 className="text-md font-semibold mb-4">Filter by City</h2>
                {cities.map((city, index) => (
                  <div key={index} className="mt-2">
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => setSelectedCity(city)}
                      className="mr-2"
                    />
                    <label htmlFor={city} className="text-sm text-gray-600">
                      {city}
                    </label>
                  </div>
                ))}
              </div>

              <div className="niches">
                <h2 className="text-md font-semibold mb-4">Filter by Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index} className="mt-2">
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => setSelectedNiche(niche)}
                      className="mr-2"
                    />
                    <label htmlFor={niche} className="text-sm text-gray-600">
                      {niche}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            <div className="jobs_container w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[min-content]">
              {jobs.map((job) => (
                <Card
                  key={job._id}
                  title={job.title}
                  companyName={job.companyName}
                  location={job.location}
                  salary={job.salary}
                  postedOn={job.jobPostedOn}
                  link={`/jobs/${job._id}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;

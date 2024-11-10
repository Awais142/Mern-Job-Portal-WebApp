import React from "react";
import { LuUserPlus, LuSearch, LuClipboardCheck } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { MdPersonSearch } from "react-icons/md";

const Card = ({ icon: Icon, title, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105">
    <div className="mb-4">
      <Icon className="text-5xl text-zinc-600 mx-auto" />
    </div>
    <h5 className="text-xl font-semibold text-gray-600 mb-3">{title}</h5>
    <p className="text-gray-700">{description}</p>
  </div>
);

const jobSeekerCards = [
  {
    icon: LuUserPlus,
    title: "Create Your Profile",
    description:
      "Sign up and build your professional profile highlighting your skills, experience, and career goals.",
  },
  {
    icon: LuSearch,
    title: "Search for Jobs",
    description:
      "Browse through a wide range of job listings and use filters to find positions that match your skills and preferences.",
  },
  {
    icon: LuClipboardCheck,
    title: "Apply and Get Hired",
    description:
      "Submit applications to your chosen positions, communicate with potential employers, and accept job offers that align with your career aspirations.",
  },
];

const employerCards = [
  {
    icon: LuUserPlus,
    title: "Create Company Profile",
    description:
      "Sign up and create a detailed company profile to attract top talent and showcase your organization's culture and values.",
  },
  {
    icon: VscTasklist,
    title: "Post Job Openings",
    description:
      "Easily post detailed job descriptions for your open positions, specifying requirements and responsibilities.",
  },
  {
    icon: MdPersonSearch,
    title: "Review and Hire",
    description:
      "Browse through applicant profiles, shortlist candidates, conduct interviews, and extend job offers to your chosen applicants.",
  },
];

const ProcessOverview = () => {
  return (
    <section className="py-12 px-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-4xl font-bold text-center text-gray-600 mb-8">
        How It Works
      </h3>

      <div className="container max-w-6xl mx-auto space-y-12">
        <div>
          <h4 className="text-2xl font-semibold text-gray-600 mb-6 text-center">
            For Job Seekers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobSeekerCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-semibold text-gray-600 mb-6 text-center">
            For Employers
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employerCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;

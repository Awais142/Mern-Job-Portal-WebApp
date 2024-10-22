import React from "react";
import {
  FaCode,
  FaCogs,
  FaCloud,
  FaDatabase,
  FaMobileAlt,
  FaServer,
} from "react-icons/fa";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Front End Developer     ", // Added spaces for uniform title length
      description:
        "Expertise in building interactive, user-friendly web interfaces using modern front-end technologies like HTML, CSS, and JavaScript.",
      icon: <FaCode className="text-gray-500" />, // Icon for Front End Developer
    },
    {
      id: 2,
      service: "Full Stack Developer    ",
      description:
        "Proficient in both front-end and back-end development, capable of building complete web applications from design to deployment.",
      icon: <FaServer className="text-gray-500" />, // Icon for Full Stack Developer
    },
    {
      id: 3,
      service: "Backend Developer      ",
      description:
        "Specializes in server-side logic, API development, and database management to ensure seamless application performance.",
      icon: <FaDatabase className="text-gray-500" />, // Icon for Backend Developer
    },
    {
      id: 4,
      service: "Cloud Engineer           ",
      description:
        "Skilled in designing, managing, and scaling cloud infrastructure, optimizing application performance in a cloud environment.",
      icon: <FaCloud className="text-gray-500" />, // Icon for Cloud Engineer
    },
    {
      id: 5,
      service: "DevOps Engineer         ",
      description:
        "Streamlines development and IT operations by implementing automation, continuous integration, and deployment processes.",
      icon: <FaCogs className="text-gray-500" />, // Icon for DevOps Engineer
    },
    {
      id: 6,
      service: "Mobile App Developer    ",
      description:
        "Expertise in building responsive and engaging mobile applications for iOS and Android using modern mobile frameworks.",
      icon: <FaMobileAlt className="text-gray-500" />, // Icon for Mobile App Developer
    },
  ];

  return (
    <section className="top-niches py-12 px-4 bg-gray-100 md:min-h-screen">
      <h3 className="text-4xl poppins-bold text-center text-gray-600 mb-8">
        Top Job Niches To Explore
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="card bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-2xl font-bold text-zinc-500 poppins-bold">
                {service.service}
              </h4>
              {service.icon} {/* Icon placed to the right */}
            </div>
            <p className="text-gray-700 leading-relaxed poppins-regular">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;

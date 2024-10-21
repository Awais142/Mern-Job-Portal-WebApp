import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt } from "react-icons/fa"; // Importing icons

const Card = ({ title, companyName, location, salary, postedOn, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-700">Company: {companyName}</p>

      {/* Location with Icon */}
      <p className="text-gray-700 flex items-center">
        <FaMapMarkerAlt className="mr-2 text-zinc-600" /> {location}
      </p>

      {/* Salary with Icon */}
      <p className="text-gray-700 flex items-center">
        <FaRupeeSign className="mr-2 text-zinc-600" /> Rs. {salary}
      </p>

      {/* Posted On with Calendar Icon */}
      <p className="text-gray-700 flex items-center">
        <FaCalendarAlt className="mr-2 text-zinc-600" /> Posted On:{" "}
        {postedOn.substring(0, 10)}
      </p>

      <Link
        to={link}
        className="absolute bottom-4 right-4 text-zinc-600 hover:text-zinc-800"
      >
        Learn More →
      </Link>
    </div>
  );
};

export default Card;

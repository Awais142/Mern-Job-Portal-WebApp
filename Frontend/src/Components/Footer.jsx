import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-200 to-gray-300">
      <div className="max-w-screen-xl py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="/src/assets/images/logo.png"
              className="mr-5 h-40 sm:h-20"
              alt="logo"
            />
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              Your go-to platform for finding top talent or your next career
              opportunity. Simplifying the hiring process and empowering job
              seekers.
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                className="hover:opacity-75"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-500"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-500"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-500"
                    href="#"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Customer Support</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    className="text-sm text-gray-600 hover:text-gray-500"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-sm text-gray-600 hover:text-gray-500"
                    to="/about-us"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    className="text-sm text-gray-600 hover:text-gray-500"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              Subscribe to Our Newsletter
            </h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                className="mt-2 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-gray-600">
          <hr className=" border-1 border-gray-600 mb-6" />
          &copy; 2024. JOBS CONSTRUCTIONS All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

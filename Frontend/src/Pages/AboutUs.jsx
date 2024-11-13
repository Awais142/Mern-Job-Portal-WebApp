import React from "react";
import { Users, Briefcase, Target, Quote } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen mt-8 poppins-regular">
      {/* Header */}
      <header className="bg-gray-700-600 text-black py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">About Jobs Construction</h1>
        <p className="text-2xl">Building Careers, Shaping Futures</p>
      </header>

      {/* Our Journey */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Diverse workplace"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Founded in 2010, Jobs Construction has become a trusted platform
                for job seekers across various fields, helping connect talented
                professionals with leading employers nationwide. What started as
                a small platform for job matching has grown into a comprehensive
                career network for professionals in multiple industries.
              </p>
              <p className="text-lg">
                Over the years, we’ve continued to expand our services, adapting
                to the needs of a dynamic job market and empowering
                professionals to build successful, meaningful careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-700 text-white py-16 px-4 poppins-regular">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Users size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Talent</h3>
              <p>
                Bridging the gap between skilled professionals and diverse job
                opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Briefcase size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empower Careers</h3>
              <p>
                Offering resources and tools for career growth across all
                industries.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Target size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Drive Innovation</h3>
              <p>
                Pushing boundaries in job-matching technology to transform
                hiring practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 poppins-regular">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://img.freepik.com/free-photo/handsome-man-posing-wedding-suit-streets_1328-3180.jpg?t=st=1731505723~exp=1731509323~hmac=06350051ec648616e63ffc3ba8b9f499fe0ab29f35faf978ddb0b69039942caa&w=740"
                alt="Team member 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Jane Doe</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3799790/pexels-photo-3799790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team member 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">John Smith</h3>
                <p className="text-gray-600">CTO</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1613800811878-3ef4c86da350?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team member 3"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Emily Brown</h3>
                <p className="text-gray-600">Head of Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-200 py-16 px-4 mb-4 poppins-regular">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Quote className="text-gray-700 mb-4" size={32} />
              <p className="text-lg mb-4">
                "Jobs Construction connected me with a role that aligns
                perfectly with my career goals. The platform is easy to
                navigate, and there are always new listings from reputable
                companies."
              </p>
              <p className="font-semibold">- Mike Johnson, Project Manager</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Quote className="text-gray-700 mb-4" size={32} />
              <p className="text-lg mb-4">
                "Jobs Construction has been a game-changer for our recruitment
                process. We’ve been able to reach top candidates in record
                time."
              </p>
              <p className="font-semibold">- Sarah Lee, HR Director</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

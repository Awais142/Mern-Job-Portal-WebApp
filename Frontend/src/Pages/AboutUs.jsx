import React from "react";
import { Users, Briefcase, Target, Quote } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen mt-8 poppins-regular">
      {/* Header */}
      <header className="bg-gray-700-600 text-black py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">About Jobs Construction</h1>
        <p className="text-2xl">Building Careers, Constructing Futures</p>
      </header>

      {/* Our Journey */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Construction site"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Founded in 2010, Jobs Construction has been at the forefront of
                connecting talented professionals with exciting opportunities in
                the construction industry. Our platform has grown from a small
                startup to a leading job marketplace, serving thousands of job
                seekers and employers across the nation.
              </p>
              <p className="text-lg">
                Over the years, we've continuously evolved our services to meet
                the changing needs of the construction sector, always staying
                true to our core mission of facilitating meaningful career
                connections.
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
                Bridging the gap between skilled professionals and construction
                opportunities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Briefcase size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empower Careers</h3>
              <p>
                Providing tools and resources for career growth and development
                in construction.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Target size={48} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Industry Innovation
              </h3>
              <p>
                Driving progress in the construction sector through cutting-edge
                job matching technology.
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
                "Jobs Construction helped me find my dream job in the
                construction industry. The platform is user-friendly and the job
                listings are always up-to-date."
              </p>
              <p className="font-semibold">- Mike Johnson, Project Manager</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Quote className="text-gray-700 mb-4" size={32} />
              <p className="text-lg mb-4">
                "As an employer, I've found exceptional talent through Jobs
                Construction. Their service has streamlined our hiring process
                and improved the quality of our workforce."
              </p>
              <p className="font-semibold">- Sarah Lee, HR Director</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

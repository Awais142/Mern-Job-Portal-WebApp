import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I apply for a job?",
    answer:
      "To apply for a job, simply click on the job listing and follow the instructions to submit your application. Make sure to upload your resume and provide any other required information.",
  },
  {
    question: "Can I apply for multiple jobs?",
    answer:
      "Yes, you can apply for multiple jobs. We encourage candidates to apply to roles that match their skills and experience.",
  },
  {
    question: "How does the job portal help me find relevant jobs?",
    answer:
      "Our job portal allows you to filter by location, job type, and industry niche to find the most relevant jobs. You can also search by keyword to narrow down the options.",
  },
  {
    question: "Is there any cost to use the job portal?",
    answer:
      "No, using the job portal is completely free for job seekers. Companies may have separate plans for posting job listings.",
  },
  {
    question: "How often are new jobs posted?",
    answer:
      "New job postings are added daily. We recommend checking frequently and setting up alerts for the types of jobs you’re interested in.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-12 px-6 md:px-12 lg:px-24 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-200 hover:bg-gray-300 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-700">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-700" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-600 text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

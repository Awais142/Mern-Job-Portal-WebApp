import React from "react";
import Hero from "../Components/Hero";
import TopNiches from "../Components/TopNiches";
import ProcessOverview from "../Components/ProcessOverview";
import FAQ from "../Components/FAQ";
FAQ;
const Home = () => {
  return (
    <>
      <Hero />
      <ProcessOverview />
      <TopNiches />
      <FAQ id="faq-sec" />
    </>
  );
};

export default Home;

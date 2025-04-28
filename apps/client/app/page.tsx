import Assistant from "@/components/Landing/Assistant";
import { ContactForm } from "@/components/Landing/ContactForm";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import FrequentQuestion from "@/components/Landing/FrequentQuestion";
import HeroSection from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import Pricing from "@/components/Landing/Pricing";
import ProblemShowCase from "@/components/Landing/ProblemShowcase";
import Success from "@/components/Landing/Success";
import React from "react";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <ProblemShowCase />
      <Assistant />
      <Success />
      <Pricing />
      <FrequentQuestion />
      <ContactForm/>
      <Footer />
    </div>
  );
};

export default Landing;

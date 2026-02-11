import About from "../_components/landingpage/About";
import Features from "../_components/landingpage/Features";
import Footer from "../_components/landingpage/Footer";
import Hero from "../_components/landingpage/Hero";
import Navbar from "../_components/landingpage/Navbar";
import Pricing from "../_components/landingpage/Pricing";

export default function Landingpage() {
  return (
    <div className="bg-gray-800 text-white w-full">
      <Navbar></Navbar>
      <Hero/>
      <Features></Features>
      <About/>
      <Pricing></Pricing>
      <Footer/>
    </div>
  );
}

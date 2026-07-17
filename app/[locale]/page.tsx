"use client";

import { motion } from "motion/react";
import Navbar from "../_components/landingpage/Navbar";
import Hero from "../_components/landingpage/Hero";
import Features from "../_components/landingpage/Features";
import About from "../_components/landingpage/About";
import Pricing from "../_components/landingpage/Pricing";
import Footer from "../_components/landingpage/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <main className="bg-slate-950 w-full relative">
      <Navbar />
      <Hero />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <Features />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <About />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <Pricing />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Footer />
      </motion.div>
    </main>
  );
}

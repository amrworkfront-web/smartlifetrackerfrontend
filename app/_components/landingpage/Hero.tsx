"use client";

import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8
    }
  }
};

const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity
    }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Container - Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content with Fade In Up */}
        <motion.div 
          className="space-y-8 text-center lg:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            variants={fadeInUp}
          >
            Organize Your Life in <br />
            <span className="text-emerald-600">One Smart Website</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            variants={fadeInUp}
          >
            Centralize your tasks, notes, journals, and calendar in a single 
            high-performance workspace designed for peak productivity.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href='/register' 
                className="group flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl"
              >
                Start For Free
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href='#features' 
                className="flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border border-border hover:bg-gray-900 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side: Image with Floating Animation */}
        <div className="relative w-full flex justify-center items-center">
          {/* Background Decorative Circles */}
          <div className="absolute w-72 h-72 bg-emerald-400 rounded-full blur-[100px] opacity-30 -top-10 -right-10"></div>
          <div className="absolute w-64 h-64 bg-green-900 rounded-full blur-[80px] opacity-20 -bottom-10 -left-10"></div>
          
          <motion.div 
            className="relative z-10 w-full max-w-[600px] drop-shadow-2xl"
            variants={floatAnimation}
            animate="animate"
          >
            <Image
              src="/heroimgwithoutbg.png"
              width={800}
              height={800}
              alt="Smart productivity workspace illustration"
              className="w-full h-auto object-contain"
              priority 
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
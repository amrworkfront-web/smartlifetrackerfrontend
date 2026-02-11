import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Container - Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <div className="space-y-8 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Organize Your Life in <br />
            <span className="text-emerald-600">One Smart Website</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Centralize your tasks, notes, journals, and calendar in a single 
            high-performance workspace designed for peak productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href='/register' 
              className="group flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl "
            >
              Start For Free
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href='#features' 
              className="flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border border-border hover:bg-gray-900 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side: Image with Decorative Blur */}
        <div className="relative w-full flex justify-center items-center">
          {/* Background Decorative Circles */}
          <div className="absolute w-72 h-72 bg-emerald-400 rounded-full blur-[100px] opacity-30 -top-10 -right-10"></div>
          <div className="absolute w-64 h-64 bg-green-900 rounded-full blur-[80px] opacity-20 -bottom-10 -left-10"></div>
          
          <div className="relative z-10 w-full max-w-[600px] drop-shadow-2xl">
            <Image
              src="/heroimgwithoutbg.png"
              width={800}
              height={800}
              alt="Smart productivity workspace illustration"
              className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500"
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  )
}
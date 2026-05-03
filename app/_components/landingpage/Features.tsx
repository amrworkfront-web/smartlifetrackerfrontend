"use client";

import {
  Check,
  BookmarkCheck,
  NotebookPen,
  AlarmClockCheck,
} from "lucide-react";
import { motion } from "motion/react";

const featuresData = [
  {
    title: "Smart Tasks",
    description: "Organize your daily grind with smart lists, priority tags, and automated scheduling tailored to your pace.",
    icon: <Check size={28} />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Quick Notes",
    description: "Capture thoughts instantly. Organize with tags and find everything with our powerful search.",
    icon: <BookmarkCheck size={28} />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Daily Journal",
    description: "Reflect on your day with a beautiful journaling experience that helps you track your growth.",
    icon: <NotebookPen size={28} />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Focus Timer",
    description: "Stay in the zone with integrated Pomodoro timers designed to maximize your deep work sessions.",
    icon: <AlarmClockCheck size={28} />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl lg:text-5xl font-bold italic">Everything you need in <span className="text-emerald-600">one place</span></h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Powerful tools to help you manage your time, thoughts, and productivity.</p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        {featuresData.map((feature, index) => (
          <motion.div 
            key={index}
            className="group relative p-8 rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-emerald-500/10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            {/* Icon Container */}
            <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold mb-3 text-white">
              {feature.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              {feature.description}
            </p>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
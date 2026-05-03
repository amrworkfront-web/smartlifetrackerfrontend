"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals just getting started with organization.",
    features: ["Up to 10 Tasks/day", "Basic Notes", "Daily Journal", "Community Support"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    description: "The best tools for power users who want to maximize output.",
    features: [
      "Unlimited Tasks",
      "Priority Tags",
      "Pomodoro Timer",
      "Advanced Search",
      "Cloud Sync",
      "Priority Email Support",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29",
    description: "Advanced features and security for teams and businesses.",
    features: ["Shared Workspaces", "Team Analytics", "Admin Controls", "Custom Integrations", "24/7 Phone Support"],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" id="pricing">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-emerald-500 font-semibold uppercase tracking-widest text-sm">Pricing</h2>
          <h3 className="text-4xl lg:text-6xl font-bold text-white italic">
            Choose your <span className="text-emerald-600">productivity</span> level
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Simple, transparent pricing that grows with you. No hidden fees.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                tier.popular
                  ? "bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-500"
                  : "bg-slate-950/50 border-white/10 hover:border-white/20"
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              whileHover={{ scale: 1.05 }}
            >
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                    tier.popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tier.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
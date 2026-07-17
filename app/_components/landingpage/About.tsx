import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  const stats = [
    { label: "Active Users", value: "10k+" },
    { label: "Tasks Completed", value: "1M+" },
    { label: "Productivity Boost", value: "45%" },
  ];

  return (
    <section className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Visual/Image */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full" />
          <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-slate-900 shadow-2xl">
             {/* هنا يمكنك وضع صورة لواجهة التطبيق أو صورة تعبيرية */}
            <Image 
              src="/heroimgwithoutbg.png"
              alt="Smart Life Tracker Dashboard Preview"
              width={600}
              height={400}
              className="w-full h-auto object-cover opacity-80"
              loading="lazy"
            />
          </div>
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-8 -right-8 bg-emerald-600 p-6 rounded-2xl shadow-xl hidden md:block">
            <p className="text-white font-bold text-2xl">Join 10,000+</p>
            <p className="text-emerald-100 text-sm">Productive lives transformed</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-emerald-500 font-semibold tracking-wider uppercase text-sm">
              Why Smart Life Tracker?
            </h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              We built the tool we <br /> 
              <span className="italic">always wanted</span> to use.
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tired of jumping between five different apps to manage your day? We were too. 
              Smart Life Tracker was born from the need for a unified, high-performance 
              workspace that respects your focus and enhances your natural workflow.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "All-in-one workspace",
              "Blazing fast performance",
              "Dark mode by default",
              "Privacy first approach"
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-200">
                <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
import { Twitter, Instagram, Github, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Smart Life <span className="text-emerald-600">Tracker</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Take control of your time and boost your productivity with our all-in-one smart workspace. Built for modern achievers.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-emerald-500 hover:bg-white/10 transition">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-emerald-500 hover:bg-white/10 transition">
                <Github size={18} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-emerald-500 hover:bg-white/10 transition">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#features" className="hover:text-emerald-500 transition">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-emerald-500 transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-emerald-500 transition">Desktop App</Link></li>
              <li><Link href="#" className="hover:text-emerald-500 transition">Browser Extension</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#about" className="hover:text-emerald-500 transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-emerald-500 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-emerald-500 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-emerald-500 transition">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-white font-bold">Stay Updated</h3>
            <p className="text-sm text-gray-400">Get productivity tips and updates delivered to your inbox.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-emerald-500 transition"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition">
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Smart Life Tracker. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by your team
          </p>
        </div>
      </div>
    </footer>
  );
}
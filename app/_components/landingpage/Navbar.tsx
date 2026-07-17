import { Link } from "@/navigation"; // تأكد من الـ import الصحيح للـ i18n لو شغال بيه

export default function Navbar() {
  return (
    <nav className="flex justify-center sticky top-4 z-50  ">
      {/* Logo Section */}
      <div className=" flex items-center justify-between px-8 py-4 w-[80%] bg-gray-900/40 backdrop-blur-md border border-gray-600 rounded-full">
        <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl tracking-tight text-white">
          Smart Life Tracker
          </h1>
      </div>

      {/* Navigation Links - Hidden on mobile, flex on desktop */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
        <li className="hover:text-emerald-600 cursor-pointer transition">Features</li>
        <li className="hover:text-emerald-600 cursor-pointer transition">About</li>
        <li className="hover:text-emerald-600 cursor-pointer transition">Pricing</li>
      </ul>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        <Link 
          href='/login' 
          className="text-sm font-medium hover:text-emerald-600 transition"
        >
          Login
        </Link>
        <Link 
          href='/register'
          className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition  "
        >
          Sign UP
        </Link>
      </div>
      </div>
    </nav>
  );
}
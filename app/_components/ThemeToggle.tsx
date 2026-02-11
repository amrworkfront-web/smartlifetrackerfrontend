"use client"
import { Sun,Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 border rounded"
    >
   {theme==="light"?<Moon/>:<Sun className="text-orange-200"/>}
    </button>
  )
}
"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Play, Pause, RotateCcw, Target } from "lucide-react";
type Mode = "focus" | "short";

export default function FocusPomodoro() {
const [mode, setMode] = useState<Mode>("focus");
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [pomodoro, setPomodoro] = useState({
    pomodoroTime: 25,
    pomodoroName: ""
  });

  const PRESETS: Record<Mode, number> = {
  focus: Number(pomodoro.pomodoroTime) * 60,
  short: 5 * 60,
};

  // تحديث القيم من الـ Inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {    const { id, value } = e.target;
    setPomodoro((prev) => ({
      ...prev,
      [id === "name" ? "pomodoroName" : "pomodoroTime"]: value
    }));
  };

  const handlePomodoro = (e: FormEvent) => {    e.preventDefault();
    setKey((prev) => prev + 1); // إعادة تشغيل التايمر بالوقت الجديد
    setIsPlaying(false);
    console.log("Started session:", pomodoro.pomodoroName);
  };


  const getThemeColor = () => (mode === "focus" ? "#7C3AED" : "#10B981");

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Focus Mode</h1>
      
      {/* عرض اسم المهمة الحالية إذا وجد */}
      {pomodoro.pomodoroName && isPlaying && (
        <div className="flex items-center gap-2 mb-4 bg-purple-100 text-purple-700 px-4 py-1 rounded-full animate-pulse">
          <Target size={16} />
          <span>Focusing on: {pomodoro.pomodoroName}</span>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-10">
        {Object.keys(PRESETS).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m as Mode);
              setKey((k) => k + 1);
              setIsPlaying(false);
            }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m ? "bg-white dark:bg-gray-700 shadow-sm text-purple-600" : "text-gray-500"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Form لإعداد الجلسة */}
      {mode === "focus" && !isPlaying && (
        <form onSubmit={handlePomodoro} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-subtext uppercase">Task Name</label>
            <input 
              type="text" id="name" 
              placeholder="What's the goal?" 
              value={pomodoro.pomodoroName}
              onChange={handleChange}
              className="border-b focus:border-purple-500 outline-none bg-transparent py-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-subtext uppercase">Minutes</label>
            <input 
              type="number" id="time" 
              value={pomodoro.pomodoroTime}
              onChange={handleChange}
              className="border-b focus:border-purple-500 outline-none bg-transparent py-1"
            />
          </div>
          <button className="bg-purple-600 text-white rounded-xl py-2 px-4 hover:bg-purple-700 transition-colors mt-auto">
            Set Goal
          </button>
        </form>
      )}

      {/* Timer */}
      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={PRESETS[mode]}
        colors={getThemeColor()}
        size={280}
        strokeWidth={15}
        onComplete={() => {
          setIsPlaying(false);
          new Audio("/ding.mp3").play().catch(() => {});
          alert("Session completed! Take a break.");
        }}
      >
        {({ remainingTime }) => {
          const mins = Math.floor(remainingTime / 60);
          const secs = remainingTime % 60;
          return (
            <div className="text-center">
              <div className="text-6xl font-bold">{mins}:{secs.toString().padStart(2, "0")}</div>
              <div className="text-gray-400 mt-2 uppercase tracking-widest">{mode}</div>
            </div>
          );
        }}
      </CountdownCircleTimer>

      {/* Controls */}
      <div className="flex gap-4 mt-12">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white shadow-lg transition-all active:scale-95 ${
            isPlaying ? "bg-orange-500 hover:bg-orange-600" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isPlaying ? <><Pause /> Pause</> : <><Play /> Start Focus</>}
        </button>

        <button
          onClick={() => { setKey((k) => k + 1); setIsPlaying(false); }}
          className="p-4 border rounded-full hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RotateCcw className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
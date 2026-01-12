import axiosInstance from "./axiosInstance";

/* =========================
   Types
========================= */

export type HabitType =
  | "boolean"
  | "counter"
  | "checklist"
  | "session";

export interface Habit {
  _id: string;
  name: string;
  type: HabitType;
  meta?: {
    target?: number;
    unit?: string;
    items?: {
      key: string;
      label: string;
    }[];
  };
  createdAt: string;
}

/* =========================
   API Functions
========================= */

// ✅ Create Habit
export const createHabit = async (data: {
  name: string;
  type: HabitType;
  meta?: Habit["meta"];
}) => {
  const response = await axiosInstance.post("/habits", data);
  return response.data;
};

// 📥 Get All Habits
export const getHabits = async (): Promise<Habit[]> => {
  const response = await axiosInstance.get("/habits");
  return response.data;
};

// 🗑 Delete Habit
export const deleteHabit = async (habitId: string) => {
  const response = await axiosInstance.delete(`/habits/${habitId}`);
  return response.data;
};

// ✏️ Update Habit
export const updateHabit = async (
  habitId: string,
  data: Partial<Omit<Habit, "_id" | "createdAt">>
) => {
  const response = await axiosInstance.put(`/habits/${habitId}`, data);
  return response.data;
};

/* =========================
   Habit Logs (Daily Tracking)
========================= */

// ✅ Log Boolean / Counter / Checklist
export const logHabit = async (data: {
  habitId: string;
  date: string; // YYYY-MM-DD
  value?: boolean | number;
  checklist?: Record<string, boolean>;
}) => {
  const response = await axiosInstance.post("/habit-logs", data);
  return response.data;
};

// 📊 Get Habit Logs
export const getHabitLogs = async (
  habitId: string,
  from?: string,
  to?: string
) => {
  const response = await axiosInstance.get(`/habit-logs/${habitId}`, {
    params: { from, to },
  });
  return response.data;
};

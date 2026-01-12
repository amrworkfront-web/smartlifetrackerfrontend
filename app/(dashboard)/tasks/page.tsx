"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/app/utils/taskAPI";
import Task from "@/app/_components/Task";
import { Search } from "lucide-react";
import { AddTask } from "@/app/_components/addTask";

type TaskType = {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: boolean;
};

export default function Tasks() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "upcoming">(
    "all"
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", search, priorityFilter, dateFilter],
    queryFn: () =>
      getTasks({
        search,
        priority: priorityFilter,
        dateFilter,
      }),
  });

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (isError) return <p className="text-red-500">Error loading tasks</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className=" flex justify-between">
        <h1 className="text-xl font-bold">Tasks</h1>
        <AddTask></AddTask>
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Tabs */}
          <ul className="flex gap-2">
            {["all", "today", "upcoming"].map((item) => (
              <li
                key={item}
                onClick={() => setDateFilter(item as any)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition ${
                  dateFilter === item
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 w-full lg:w-1/3 focus-within:ring-2 focus-within:ring-green-500">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Priority Filters */}
          <ul className="flex gap-2">
            {["All", "High", "Medium", "Low"].map((p) => (
              <li
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                  priorityFilter === p
                    ? "bg-green-600 text-white"
                    : p === "High"
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : p === "Medium"
                    ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                    : "bg-green-100 text-green-600 hover:bg-green-200"
                }`}
              >
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {data.map((task: TaskType) => (
            <Task
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              deadline={task.deadline}
              status={task.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

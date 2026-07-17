"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/app/utils/taskAPI";
import TaskItem from "@/app/_components/task/Task";
import { Search, InboxIcon } from "lucide-react";
import { AddTask } from "@/app/_components/task/addTask";
import { Task as TaskType } from "@/types";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

export default function Tasks() {
  const t = useTranslations("dashboard.tasks");
  const [term, setTerm] = useState("");
  const search = useDebounce(term, 1000);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "upcoming">(
    "all",
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

  const tasks = Array.isArray(data) ? data : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <AddTask />
      </div>

      <div className="rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <ul className="flex gap-2" role="tablist" aria-label={t("title")}>
            {(["all", "today", "upcoming"] as const).map((item) => (
              <li key={item} role="presentation">
                <button
                  role="tab"
                  aria-selected={dateFilter === item}
                  onClick={() => setDateFilter(item)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition ${
                    dateFilter === item
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(`filters.${item}`)}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 w-full lg:w-1/3 focus-within:ring-2 focus-within:ring-green-500">
            <Search className="text-subtext" size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full outline-none text-sm placeholder-subtext"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label={t("searchPlaceholder")}
            />
          </div>

          <ul className="flex gap-2" role="group" aria-label="Priority filter">
            {(["All", "High", "Medium", "Low"] as const).map((p) => (
              <li key={p}>
                <button
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
                  {t(
                    p === "All" ? "filters.all" : `priority.${p.toLowerCase()}`,
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4" role="list" aria-label={t("title")}>
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-10 gap-4 p-4">
                <div className="flex items-start gap-2 col-span-1 md:col-span-8 w-full">
                  <Skeleton className="h-4 w-4 mt-1 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-4">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 col-span-1 md:col-span-2 justify-end">
                  <Skeleton className="h-8 w-16 rounded-lg" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            ))}

          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-red-500 font-medium">{t("status.error")}</p>
            </div>
          )}

          {!isLoading && !isError && tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <InboxIcon className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">{t("status.empty")}</p>
            </div>
          )}

          {tasks.map((task: TaskType) => (
            <div
              key={task._id}
              role="listitem"
              className="grid grid-cols-1 md:grid-cols-10 gap-4 p-4 card"
            >
              <TaskItem
                id={task._id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                deadline={task.deadline}
                status={task.status}
                isCompleted={task.isCompleted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

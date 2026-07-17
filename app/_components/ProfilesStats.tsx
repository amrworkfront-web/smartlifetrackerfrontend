"use client";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, BookOpen, ClipboardList, Flame } from "lucide-react";
import { getTasks } from "../utils/taskAPI";
import { getNotes } from "../utils/notesAPI";
import { getJournals } from "../utils/journalAPI";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileStats() {
  const t = useTranslations("dashboard.profile.stats");

  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
  const { data: notes, isLoading: notesLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });
  const { data: journals, isLoading: journalsLoading } = useQuery({
    queryKey: ["journals"],
    queryFn: () => getJournals(),
  });

  const isLoading = tasksLoading || notesLoading || journalsLoading;

  const totalTasks = tasks?.length ?? 0;
  const totalNotes = notes?.length ?? 0;
  const totalJournals = journals?.length ?? 0;
  const completedTasks = tasks?.filter((task) => task.status).length ?? 0;

  const stats = [
    { label: t("totalTasks"), value: totalTasks, icon: ClipboardList },
    { label: t("completed"), value: completedTasks, icon: CheckCircle },
    { label: t("journals"), value: totalJournals, icon: BookOpen },
    { label: t("notes"), value: totalNotes, icon: Flame },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl shadow-sm flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list" aria-label={t("totalTasks")}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          role="listitem"
          className="p-4 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <stat.icon className="text-green-500" aria-hidden="true" />
          <div>
            <p className="text-sm text-subtext">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

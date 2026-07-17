"use client";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../utils/taskAPI";
import { toast } from "sonner";
import UpdateTask from "./UpdateTask";
import { Loader2 } from "lucide-react";

type TaskProps = {
  id: string;
  title: string;
  description?: string;
  deadline: string;
  priority: string;
  status: boolean;
  isCompleted?: boolean;
};

export default function TaskItem({
  id,
  title,
  description,
  deadline,
  priority,
  status,
}: TaskProps) {
  const t = useTranslations("dashboard.tasks");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success(t("toast.deleteSuccess", { title }));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error(t("toast.deleteError"));
    },
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus: boolean) =>
      updateTask({ id, title, description, priority, deadline, status: newStatus }),
    onSuccess: () => {
      toast.success(t("toast.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <>
      <div className="flex items-start gap-2 col-span-1 md:col-span-8">
        <input
          type="checkbox"
          className="mt-1 cursor-pointer"
          checked={status}
          disabled={statusMutation.isPending}
          onChange={(e) => statusMutation.mutate(e.target.checked)}
          aria-label={`Mark "${title}" as ${status ? "incomplete" : "complete"}`}
        />
        {statusMutation.isPending && (
          <Loader2 className="w-4 h-4 animate-spin text-green-500 mt-1" aria-hidden="true" />
        )}
        <div className="flex-1 space-y-1">
          <h2 className={`font-medium ${status ? "line-through text-gray-400" : ""}`}>
            {title}
          </h2>
          {description && (
            <p className="text-sm text-subtext">{description}</p>
          )}
          <div className="flex gap-4 text-xs text-subtext">
            <time dateTime={deadline}>{deadline}</time>
            <span
              className={
                priority === "High"
                  ? "text-red-600"
                  : priority === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
              }
            >
              {t(`priority.${priority.toLowerCase()}`)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 col-span-1 md:col-span-2 justify-between md:justify-end items-end">
        <UpdateTask
          id={id}
          title={title}
          description={description}
          priority={priority}
          deadline={deadline}
        />
        <button
          onClick={() => deleteMutation.mutate(id)}
          className="delete-btn"
          disabled={deleteMutation.isPending}
          aria-label={t("actions.delete") + " " + title}
        >
          {deleteMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            t("actions.delete")
          )}
        </button>
      </div>
    </>
  );
}

'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../utils/taskAPI";
import { toast } from "sonner";
import UpdateTask from "./UpdateTask";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: boolean;
};

export default function Task({
  id,
  title,
  description,
  deadline,
  priority,
  status,
}: TaskProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success(`Task "${title}" deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: (newStatus: boolean) =>
      updateTask({ id, title, description, priority, deadline, status: newStatus }),
    onSuccess: () => {
      toast.success("Task updated");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <div className="
      grid grid-cols-1
      md:grid-cols-10
      gap-4 p-4 border rounded-xl
      hover:shadow-sm transition
    ">
      
      <div className="
        flex items-start gap-2
        col-span-1
        md:col-span-8
      ">
        <input
          type="checkbox"
          className="mt-1"
          checked={status}
          disabled={statusMutation.isPending}
          onChange={(e) => statusMutation.mutate(e.target.checked)}
        />

        <div className="flex-1 space-y-1">
          <h2 className="font-medium text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>

          <div className="flex gap-4 text-xs text-gray-400">
            <span>{deadline}</span>
            <span
              className={
                priority === "High"
                  ? "text-red-600"
                  : priority === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {priority}
            </span>
          </div>
        </div>
      </div>

      <div className="
        flex gap-2
        col-span-1
        md:col-span-2
        
        justify-between md:justify-end
      
        items-end
        
      ">
        <UpdateTask
          id={id}
          title={title}
          description={description}
          priority={priority}
          deadline={deadline}
        />
        <button
          onClick={() => deleteMutation.mutate(id)}
          className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTask } from "@/app/utils/taskAPI";
import { Textarea } from "@/components/ui/textarea";
type TaskData = {
  title: string;
  description: string;
  priority: string;
  deadline: string;
  
};
export function AddTask() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset } = useForm<TaskData>();

  const mutation = useMutation({
    mutationFn: (data: TaskData) => CreateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      reset();
    },
    // onError: (error: any) => {
    //   console.log("Error faild add task", error);
    // },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition">
          <Plus className="w-4 h-4" />
Add Task      </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>Fill in the details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Task title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Task description"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                {...register("priority")}
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : undefined)
                    }
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

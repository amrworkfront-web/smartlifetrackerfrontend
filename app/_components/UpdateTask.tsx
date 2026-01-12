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
import { DatePicker } from "./DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/app/utils/taskAPI";
import {toast} from 'sonner'
import { Textarea } from "@/components/ui/textarea";

type TaskData = {
  id: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
};
export default function UpdateTask({
  id,
  title,
  deadline,
  description,
  priority,
}: TaskData) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset } = useForm<TaskData>({
    defaultValues: {
      title,
      description,
      priority,
      deadline,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TaskData) => updateTask(data),
    onSuccess: () => {
        toast.success("task updated successfuly")
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      

    },
    onError: () => {
      toast.error("Error faild add task");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
          Update{" "}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate({...data,id});
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
              Save Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

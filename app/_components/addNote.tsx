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
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/app/utils/notesAPI";
import { Textarea } from "@/components/ui/textarea";
type TaskData = {
  title: string;
  content: string;
  tag: string;
  
};
export function AddNote() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<TaskData>();

  const mutation = useMutation({
    mutationFn: (data: TaskData) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

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
Add Note       </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
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
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Task Content"
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                {...register("tag")}
                placeholder="Task tag"
              />
            </div>


          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

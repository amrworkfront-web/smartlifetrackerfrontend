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
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from 'sonner'
import { updateJournal } from "../utils/journalAPI";
import { Pen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type JournalData = {
  id: string;
  title: string;
  content: string;
  mood: string;
};
export default function UpdateJournal({
  id,
  title,
  content,
  mood,
}: JournalData) {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<JournalData>({
    defaultValues: {
      title,
      content,
      mood,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: JournalData) => updateJournal(data),
    onSuccess: () => {
        toast.success("journal updated successfuly")
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      

    },
    onError: () => {
      toast.error("Error faild add journal");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
   <Pen/>
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
            <DialogTitle>Create Journal</DialogTitle>
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
                placeholder="Task content"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mood">Mood</Label>
              <Input
                id="mood"
                {...register("mood")}
                placeholder="Task mood"
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

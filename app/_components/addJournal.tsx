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
import { createJournal } from "@/app/utils/journalAPI";
import { Textarea } from "@/components/ui/textarea";
import {toast} from "sonner"
type JournalData = {
  title: string;
  content: string;
  mood: string;
  
};
export function AddJournal() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<JournalData>();

  const mutation = useMutation({
    mutationFn: (data: JournalData) => createJournal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
toast.success("journal created succussfully")
      reset();
    },
    onError: (error: any) => {
      toast.error("Error faild add jornal", {
        description: error.response?.data?.message || "Please check your credentials and try again."
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition">
          <Plus className="w-4 h-4" />
Add journal       </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create journal</DialogTitle>
            <DialogDescription>Fill in the details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Journal title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Journal Content"
              />
            </div>


            <div className="grid gap-2">
              <Label htmlFor="mood">Mood</Label>
              <Input
                id="mood"
                {...register("mood")}
                placeholder="Journal mood"
              />
            </div>


          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save journal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJournal } from "@/app/utils/journalAPI";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const addJournalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  mood: z.enum(["Happy", "Neutral", "Sad", "Excited", "Tired", "Angry"]),
});

type AddJournalFormData = z.infer<typeof addJournalSchema>;

export function AddJournal() {
  const queryClient = useQueryClient();
  const t = useTranslations("modals.journal.create");
  const tc = useTranslations("modals.common");
  const tp = useTranslations("dashboard.journal");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddJournalFormData>({
    resolver: zodResolver(addJournalSchema),
    defaultValues: { mood: "Neutral" },
  });

  const mutation = useMutation({
    mutationFn: (data: AddJournalFormData) => createJournal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success(tp("toast.createSuccess"));
      reset();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(tp("toast.createError"), {
        description: error.response?.data?.message,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center add-btn" aria-label={tp("addJournal")}>
          <Plus className="w-4 h-4" aria-hidden="true" />
          {tp("addJournal")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] w-full max-h-[90vh] flex flex-col">
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col flex-1"
        >
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <DialogHeader>
              <DialogTitle>{t("title")}</DialogTitle>
              <DialogDescription>{tc("fillDetails")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="journal-title">{t("titleLabel")}</Label>
                <Input
                  id="journal-title"
                  {...register("title")}
                  placeholder={t("titlePlaceholder")}
                  aria-invalid={!!errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500" role="alert">{errors.title.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="journal-content">{t("contentLabel")}</Label>
                <Textarea
                  id="journal-content"
                  {...register("content")}
                  placeholder={t("contentPlaceholder")}
                />
                {errors.content && (
                  <p className="text-sm text-red-500" role="alert">{errors.content.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="journal-mood">{t("moodLabel")}</Label>
                <select
                  id="journal-mood"
                  {...register("mood")}
                  className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Happy">{tp("mood.happy")}</option>
                  <option value="Neutral">{tp("mood.neutral")}</option>
                  <option value="Sad">{tp("mood.sad")}</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{tc("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={mutation.isPending}
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

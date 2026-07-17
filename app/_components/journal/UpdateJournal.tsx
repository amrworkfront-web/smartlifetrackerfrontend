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
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateJournal } from "../../utils/journalAPI";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const updateJournalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  mood: z.string().min(1, "Mood is required"),
});

type UpdateJournalFormValues = z.infer<typeof updateJournalSchema>;

type UpdateJournalProps = {
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
}: UpdateJournalProps) {
  const t = useTranslations("modals.journal");
  const tc = useTranslations("modals.common");
  const tp = useTranslations("dashboard.journal");
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<UpdateJournalFormValues>({
    resolver: zodResolver(updateJournalSchema),
    defaultValues: { title, content, mood },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateJournalFormValues) =>
      updateJournal({ ...data, id }),
    onSuccess: () => {
      toast.success(tp("toast.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
    onError: () => {
      toast.error(tp("toast.updateError"));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="update-btn" aria-label={t("update.title")}>
          <Pen aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{t("update.title")}</DialogTitle>
            <DialogDescription>{tc("fillDetails")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="update-journal-title">{t("create.titleLabel")}</Label>
              <Input
                id="update-journal-title"
                {...register("title")}
                placeholder={t("create.titlePlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-journal-content">{t("create.contentLabel")}</Label>
              <Textarea
                id="update-journal-content"
                {...register("content")}
                placeholder={t("create.contentPlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-journal-mood">{t("create.moodLabel")}</Label>
              <Input
                id="update-journal-mood"
                {...register("mood")}
                placeholder={t("create.moodPlaceholder")}
              />
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
              {t("update.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { updateNote, UpdateNoteInput } from "../../utils/notesAPI";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const updateNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(5000),
  tag: z.string().max(50),
});

type UpdateNoteFormValues = z.infer<typeof updateNoteSchema>;

type UpdateNoteProps = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

export default function UpdateNote({
  id,
  title,
  content,
  tag,
}: UpdateNoteProps) {
  const t = useTranslations("modals.notes");
  const tc = useTranslations("modals.common");
  const tn = useTranslations("dashboard.notes");
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<UpdateNoteFormValues>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: { title, content, tag },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateNoteInput) =>
      updateNote({ ...data, id }),
    onSuccess: () => {
      toast.success(tn("toast.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error(tn("toast.updateError"));
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
          onSubmit={handleSubmit((data) => mutation.mutate({ ...data, id }))}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{t("update.title")}</DialogTitle>
            <DialogDescription>{tc("fillDetails")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="update-note-title">{t("create.titleLabel")}</Label>
              <Input
                id="update-note-title"
                {...register("title")}
                placeholder={t("create.titlePlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-note-content">{t("create.contentLabel")}</Label>
              <Textarea
                id="update-note-content"
                {...register("content")}
                placeholder={t("create.contentPlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-note-tag">{t("create.tagLabel")}</Label>
              <Input
                id="update-note-tag"
                {...register("tag")}
                placeholder={t("create.tagPlaceholder")}
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

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
import { updateJournal } from "../../utils/journalAPI";
import { Pen } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("modals.journal");
  const tc = useTranslations("modals.common");
  const tp= useTranslations("dashboard.journal");

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
        toast.success(tp("toast.updateSuccess"))
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
    onError: () => {
      toast.error(tp("toast.updateError"));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
   <Pen/>
        </button>
      </DialogTrigger>

      <DialogContent      onPointerDownOutside={(e)=>e.preventDefault()} className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate({...data,id});
          })}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{t("update.title")}</DialogTitle>
            <DialogDescription>{tc("fillDetails")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="title">{t("create.titleLabel")}</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder={t("create.titlePlaceholder")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">{t("create.contentLabel")}</Label>
              <textarea
                id="content"
                {...register("content")}
                placeholder={t("create.contentPlaceholder")}
                className="textarea"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mood">{t("create.moodLabel")}</Label>
              <Input
                id="mood"
                {...register("mood")}
                placeholder={t("create.moodPlaceholder")}
              />
            </div>

          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{tc("cancel")}</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {t("update.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

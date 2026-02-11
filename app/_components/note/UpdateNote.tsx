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
import { updateNote } from "../../utils/notesAPI";
import { Pen } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type NoteData = {
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
}: NoteData) {
  const t = useTranslations("modals.notes");
  const tc = useTranslations("modals.common");
  const tn = useTranslations("dashboard.notes");
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<NoteData>({
    defaultValues: {
      title,
      content,
      tag,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NoteData) => updateNote(data),
    onSuccess: () => {
        toast.success(tn("toast.updateSuccess"))
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error(tc("fillDetails")); // or generic error
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition hover:cursor-pointer">
   <Pen/>
        </button>
      </DialogTrigger>

      <DialogContent       onPointerDownOutside={(e)=>e.preventDefault()} className="sm:max-w-[450px] w-full">
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
              <Label htmlFor="tag">{t("create.tagLabel")}</Label>
              <Input
                id="tag"
                {...register("tag")}
                placeholder={t("create.tagPlaceholder")}
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

"use client";
import { motion } from "framer-motion";

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
import { toast } from "sonner";
import { createNote } from "@/app/utils/notesAPI";
import { useTranslations } from "next-intl";
type TaskData = {
  title: string;
  content: string;
  tag: string;
};
export function AddNote() {
  const t = useTranslations("modals.notes");
  const tc = useTranslations("modals.common");
  const tn = useTranslations("dashboard.notes");
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<TaskData>();

  const mutation = useMutation({
    mutationFn: (data: TaskData) => createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(tn("toast.createSuccess"));
      reset();
    },
    onError: (error: any) => {
      toast.error(tn("toast.createError"));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition"
        >
          <Plus className="w-4 h-4" />
          {tn("addNote")}
        </motion.button>
      </DialogTrigger>

      <DialogContent      onPointerDownOutside={(e)=>e.preventDefault()} className="sm:max-w-112.5 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <form
            onSubmit={handleSubmit((data) => {
              mutation.mutate(data);
            })}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>{t("create.title")}</DialogTitle>
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
                {t("create.submit")}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

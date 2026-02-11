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
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type JournalData = {
  title: string;
  content: string;
  mood: string;
};

export function AddJournal() {
  const queryClient = useQueryClient();

  // translations
  const t = useTranslations("modals.journal.create");
  const tc = useTranslations("modals.common");
  const tp = useTranslations("dashboard.journal");

  // react-hook-form
  const { register, handleSubmit, reset } = useForm<JournalData>();

  // react-query mutation
  const mutation = useMutation({
    mutationFn: (data: JournalData) => createJournal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success(tp("toast.createSuccess"));
      reset();
    },
    onError: (error: any) => {
      toast.error(tp("toast.createError"), {
        description:
          error.response?.data?.message ||
          "Please check your credentials and try again.",
      });
    },
  });

  return (
    <Dialog>
      {/* Button that opens the modal */}
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition">
          <Plus className="w-4 h-4" />
          {tp("addJournal")}
        </button>
      </DialogTrigger>

      {/* 
        DialogContent:
        - max-h limits modal height
        - flex-col allows header/body/footer layout
      */}
      <DialogContent  
      onPointerDownOutside={(e)=>e.preventDefault()}
      className="sm:max-w-[450px] w-full max-h-[90vh] flex flex-col">
        {/* 
          Form is flex column
          flex-1 allows inner content to grow and scroll
        */}
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col flex-1"
        >
          {/* 
            Scrollable area:
            - flex-1 takes remaining height
            - overflow-y-auto enables scroll
            - pr-1 avoids scrollbar covering content
          */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            <DialogHeader>
              <DialogTitle>{t("title")}</DialogTitle>
              <DialogDescription>{tc("fillDetails")}</DialogDescription>
            </DialogHeader>

            {/* Form fields */}
            <div className="grid gap-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="title">{t("titleLabel")}</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder={t("titlePlaceholder")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">{t("contentLabel")}</Label>

                <textarea
                  id="content"
                  {...register("content")}
                  placeholder={t("contentPlaceholder")}
                  className=" textarea "
                ></textarea>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mood">{t("moodLabel")}</Label>
                <select
                  id="mood"
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

          {/* 
            Footer:
            - outside scroll area
            - always visible
          */}
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">{tc("cancel")}</Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700  "
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

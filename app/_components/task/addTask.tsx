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
import { DatePicker } from "../DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskInput } from "@/types";
import { CreateTask } from "@/app/utils/taskAPI";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AxiosError } from "axios";

// type TaskData = {
//   title: string;
//   description: string;
//   priority: string;
//   deadline: string;
// };
// Use imported type, but ensure form is compatible.
// CreateTaskInput has priority: Priority | string which is fine.

export function AddTask() {
  const t = useTranslations("modals.tasks");
  const tc = useTranslations("modals.common");
  const tp = useTranslations("dashboard.tasks");
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset } = useForm<CreateTaskInput>();

  const mutation = useMutation({
    mutationFn: (data: CreateTaskInput) => CreateTask(data),
    onSuccess: () => {
      toast.success(tp("toast.createSuccess"));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      reset();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(tp("toast.createError"))}
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center add-btn ">
          <Plus className="w-4 h-4" />
          {tp("addTask")}
        </button>
      </DialogTrigger>

      <DialogContent      onPointerDownOutside={(e)=>e.preventDefault()} className="sm:max-w-[450px] w-full">
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
              <Label htmlFor="description">{t("create.descLabel")}</Label>
              <textarea
                id="description"
                {...register("description")}
                placeholder={t("create.descPlaceholder")}
                className="textarea"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">{t("create.priorityLabel")}</Label>
              <select
                id="priority"
                {...register("priority")}
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="High">{tp("priority.high")}</option>
                <option value="Medium">{tp("priority.medium")}</option>
                <option value="Low">{tp("priority.low")}</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deadline">{t("create.deadlineLabel")}</Label>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : undefined)
                    }
                  />
                )}
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
      </DialogContent>
    </Dialog>
  );
}

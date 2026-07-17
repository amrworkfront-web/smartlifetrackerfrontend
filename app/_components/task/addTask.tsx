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
import { DatePicker } from "../DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskInput } from "@/types";
import { createTask } from "@/app/utils/taskAPI";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000),
  priority: z.enum(["High", "Medium", "Low"]),
  deadline: z.string().min(1, "Deadline is required"),
});

type AddTaskFormData = z.infer<typeof addTaskSchema>;

export function AddTask() {
  const t = useTranslations("modals.tasks");
  const tc = useTranslations("modals.common");
  const tp = useTranslations("dashboard.tasks");
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset, formState: { errors } } =
    useForm<AddTaskFormData>({
      resolver: zodResolver(addTaskSchema),
      defaultValues: {
        title: "",
        description: "",
        priority: "Medium",
        deadline: "",
      },
    });

  const mutation = useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      toast.success(tp("toast.createSuccess"));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
        <button className="flex items-center add-btn" aria-label={tp("addTask")}>
          <Plus className="w-4 h-4" aria-hidden="true" />
          {tp("addTask")}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] w-full">
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>{t("create.title")}</DialogTitle>
            <DialogDescription>{tc("fillDetails")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="task-title">{t("create.titleLabel")}</Label>
              <Input
                id="task-title"
                {...register("title")}
                placeholder={t("create.titlePlaceholder")}
                aria-invalid={!!errors.title}
              />
              {errors.title && (
                <p className="text-sm text-red-500" role="alert">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">{t("create.descLabel")}</Label>
              <Textarea
                id="task-description"
                {...register("description")}
                placeholder={t("create.descPlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-priority">{t("create.priorityLabel")}</Label>
              <select
                id="task-priority"
                {...register("priority")}
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="High">{tp("priority.high")}</option>
                <option value="Medium">{tp("priority.medium")}</option>
                <option value="Low">{tp("priority.low")}</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label>{t("create.deadlineLabel")}</Label>
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
              {errors.deadline && (
                <p className="text-sm text-red-500" role="alert">{errors.deadline.message}</p>
              )}
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
              {mutation.isPending ? tc("fillDetails") : t("create.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

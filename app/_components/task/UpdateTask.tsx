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
import { DatePicker } from "../DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/app/utils/taskAPI";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000),
  priority: z.enum(["High", "Medium", "Low"]),
  deadline: z.string().min(1, "Deadline is required"),
});

type UpdateTaskData = {
  id: string;
  title: string;
  description?: string;
  priority: string;
  deadline: string;
};

type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;

export default function UpdateTask({
  id,
  title,
  deadline,
  description,
  priority,
}: UpdateTaskData) {
  const t = useTranslations("modals.tasks");
  const tc = useTranslations("modals.common");
  const tt = useTranslations("dashboard.tasks.toast");
  const tp = useTranslations("dashboard.tasks.priority");
  const taction = useTranslations("dashboard.tasks.actions");
  const queryClient = useQueryClient();

  const { register, handleSubmit, control } = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: { title, description: description || "", priority: priority as "High" | "Medium" | "Low", deadline },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateTaskFormValues) =>
      updateTask({ ...data, id }),
    onSuccess: () => {
      toast.success(tt("updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error(tt("updateError"));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="update-btn" aria-label={taction("update")}>
          {taction("update")}
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
              <Label htmlFor="update-title">{t("create.titleLabel")}</Label>
              <Input
                id="update-title"
                {...register("title")}
                placeholder={t("create.titlePlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-description">{t("create.descLabel")}</Label>
              <Textarea
                id="update-description"
                {...register("description")}
                placeholder={t("create.descPlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="update-priority">{t("create.priorityLabel")}</Label>
              <select
                id="update-priority"
                {...register("priority")}
                className="border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="High">{tp("high")}</option>
                <option value="Medium">{tp("medium")}</option>
                <option value="Low">{tp("low")}</option>
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

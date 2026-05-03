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
import { DatePicker } from "../DatePicker";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/app/utils/taskAPI";
import {toast} from 'sonner'
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

type TaskData = {
  id: string;
  title: string;
  description?: string;
  priority: string;
  deadline: string;
};
export default function UpdateTask({
  id,
  title,
  deadline,
  description,
  priority,
}: TaskData) {
  const t = useTranslations("modals.tasks");
  const tc = useTranslations("modals.common");
  const tt = useTranslations("dashboard.tasks.toast");
  const tp = useTranslations("dashboard.tasks.priority");
  const taction = useTranslations("dashboard.tasks.actions");
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, reset } = useForm<TaskData>({
    defaultValues: {
      title,
      description,
      priority,
      deadline,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: TaskData) => updateTask(data),
    onSuccess: () => {
        toast.success(tt("updateSuccess"))
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      

    },
    onError: () => {
      toast.error(tt("updateError"));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" update-btn">
          {taction("update")}
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
                <option value="High">{tp("high")}</option>
                <option value="Medium">{tp("medium")}</option>
                <option value="Low">{tp("low")}</option>
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
              {t("update.submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

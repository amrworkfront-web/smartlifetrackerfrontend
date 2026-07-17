"use client";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../utils/notesAPI";
import { toast } from "sonner";
import UpdateNote from "./UpdateNote";
import { Loader2 } from "lucide-react";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  tag: string;
};

export default function NoteCard({ id, title, content, tag }: NoteCardProps) {
  const t = useTranslations("dashboard.notes");
  const tc = useTranslations("dashboard.tasks.actions");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success(t("toast.deleteSuccess", { title }));
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error(t("toast.deleteError"));
    },
  });

  return (
    <div className="flex flex-col justify-between card">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
        <p className="text-sm text-subtext line-clamp-3">{content}</p>
        {tag && (
          <div className="flex gap-2 text-xs text-subtext mt-2">
            <span className={cn("px-2 py-1 rounded-full", "bg-foreground/10")}>
              {tag}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-3 justify-end">
        <UpdateNote id={id} title={title} content={content} tag={tag} />
        <button
          className="delete-btn"
          onClick={() => deleteMutation.mutate(id)}
          disabled={deleteMutation.isPending}
          aria-label={`${tc("delete")} ${title}`}
        >
          {deleteMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Trash className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

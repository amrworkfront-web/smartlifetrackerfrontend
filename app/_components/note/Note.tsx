'use client'
import { Trash ,Pen } from 'lucide-react';
import { useTranslations } from "next-intl";
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote,updateNote } from "../../utils/notesAPI";
import { toast } from "sonner";
import UpdateNote from './UpdateNote';

type NoteProps = {
  id: string;
  title: string;
  content: string;
tag:string
};

export default function Note({ id, title, content, tag,  }: NoteProps) {
  const t = useTranslations("dashboard.notes");
  const tc = useTranslations("dashboard.tasks.actions");
  const queryClient = useQueryClient();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success(t("toast.deleteSuccess", { title }));
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });


  return (
<div className="
col-span-3
gap-4 p-5   card">
  
    <div className="flex-1 space-y-2">
    <h2 className="text-lg font-semibold  line-clamp-1">{title}</h2>
    <p className="text-sm text-subtext line-clamp-3">{content}</p>

    <div className="flex gap-2 text-xs text-subtext mt-2">
      <span className={cn("px-2 py-1 rounded-full",tag&&'bg-foreground/10')}>{tag}</span>
    </div>
  </div>

  <div className="flex gap-2 mt-3 justify-end ">
    <UpdateNote 
      id={id} 
      title={title} 
      content={content} 
      tag={tag} 
      
    />
    <button
      className="delete-btn"
      onClick={() => deleteMutation.mutate(id)}
      title={tc("delete")}
    >
      <Trash className="w-4 h-4" />
    </button>
  </div>
</div>

  );
}

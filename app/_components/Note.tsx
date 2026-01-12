'use client'
import { Trash ,Pen } from 'lucide-react';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote,updateNote } from "../utils/notesAPI";
import { toast } from "sonner";
import { UpdateNote } from './UpdateNote';

type NoteProps = {
  id: string;
  title: string;
  content: string;
tag:string
};

export default function Note({ id, title, content, tag,  }: NoteProps) {
  const queryClient = useQueryClient();

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      toast.success(`note "${title}" deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });


  return (
<div className="
col-span-3
gap-4 p-5 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300 col-span-3 bg-white">
  
    <div className="flex-1 space-y-2">
    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h2>
    <p className="text-sm text-gray-500 line-clamp-3">{content}</p>

    <div className="flex gap-2 text-xs text-gray-400 mt-2">
      <span className="px-2 py-1 bg-gray-100 rounded-full">{tag}</span>
    </div>
  </div>

  <div className="flex gap-2 mt-3 justify-end">
    <UpdateNote 
      id={id} 
      title={title} 
      content={content} 
      tag={tag} 
    />
    <button
      className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 hover:cursor-pointer"
      onClick={() => deleteMutation.mutate(id)}
    >
      <Trash />
    </button>
  </div>
</div>

  );
}

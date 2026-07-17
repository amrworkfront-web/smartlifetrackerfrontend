"use client";
import { AddNote } from "@/app/_components/note/addNote";
import { Search, InboxIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotes, Note } from "@/app/utils/notesAPI";
import NoteCard from "@/app/_components/note/Note";
import { useTranslations } from "next-intl";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Notes() {
  const t = useTranslations("dashboard");
  const [term, setTerm] = useState("");
  const search = useDebounce(term, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search],
    queryFn: () => getNotes(search),
  });

  const notes = Array.isArray(data) ? data : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{t("notes.title")}</h1>
        <AddNote />
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 w-full lg:w-1/3 focus-within:ring-2 focus-within:ring-green-500">
        <Search className="text-gray-400" size={18} aria-hidden="true" />
        <input
          type="text"
          placeholder={t("notes.searchPlaceholder")}
          className="w-full outline-none text-sm placeholder-gray-400"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          aria-label={t("notes.searchPlaceholder")}
        />
      </div>

      <div className="rounded-2xl p-6 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border p-5 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-end gap-2 pt-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </div>
            ))}

          {isError && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <p className="text-red-500 font-medium">{t("notes.status.error")}</p>
            </div>
          )}

          {!isLoading && !isError && (!data || data.length === 0) && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <InboxIcon className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No notes yet</p>
            </div>
          )}

          {notes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              tag={note.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

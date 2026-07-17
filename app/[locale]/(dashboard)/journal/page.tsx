"use client";

import { AddJournal } from "@/app/_components/journal/addJournal";
import { Search, InboxIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJournals } from "@/app/utils/journalAPI";
import JournalCard from "@/app/_components/journal/Journal";
import { Journal as JournalType } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";


export default function Journals() {
  const t = useTranslations("dashboard");
  const [term, setTerm] = useState("");
  const search = useDebounce(term, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["journals", search],
    queryFn: () => getJournals(search),
  });

 
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">{t("journal.title")}</h1>
        <AddJournal />
      </div>

      <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2 max-w-md focus-within:ring-2 focus-within:ring-green-500">
        <Search className="text-gray-400" size={18} aria-hidden="true" />
        <input
          type="text"
          placeholder={t("journal.searchPlaceholder")}
          className="w-full outline-none text-sm placeholder-gray-400"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          aria-label={t("journal.searchPlaceholder")}
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-5 space-y-3">
              <div className="flex justify-between items-start">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-red-500 font-medium">{t("journal.status.error")}</p>
        </div>
      )}

      {!isLoading && !isError && (!data || data.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <InboxIcon className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No journals yet</p>
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((journal: JournalType) => (
            <JournalCard
              key={journal._id}
              id={journal._id}
              title={journal.title}
              content={journal.content}
              mood={journal.mood}
              createdAt={journal.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

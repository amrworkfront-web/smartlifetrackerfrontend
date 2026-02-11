"use client";

import { AddJournal } from "@/app/_components/journal/addJournal";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJournals } from "@/app/utils/journalAPI";
import Journal from "@/app/_components/journal/Journal";
import { Journal as JournalType } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function Journals() {
    const t = useTranslations('dashboard');
    const [term,setTerm]=useState('')
    const search=useDebounce(term,1000)

  const { data , isLoading, isError } = useQuery({
    queryKey: ["journals",search],
    queryFn:()=> getJournals(search),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading journals</p>;

  // Ensure data is array
  const journals = Array.isArray(data) ? data : [];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold ">{t('journal.title')}</h1>
        <AddJournal />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2 max-w-md
        focus-within:ring-2 focus-within:ring-green-500 ">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder={t('journal.searchPlaceholder')}
          className="w-full outline-none text-sm  placeholder-gray-400"
          value={term}
          onChange={(e)=>setTerm(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals.map((journal: JournalType) => (
          <Journal
            key={journal._id}
            id={journal._id}
            title={journal.title}
            content={journal.content}
            mood={journal.mood}
            createdAt={journal.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

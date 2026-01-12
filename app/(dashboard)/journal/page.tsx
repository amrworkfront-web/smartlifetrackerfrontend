"use client";

import { AddJournal } from "@/app/_components/addJournal";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJournals } from "@/app/utils/journalAPI";
import Journal from "@/app/_components/Journal";

type JournalType = {
  _id: string;
  title: string;
  content: string;
  mood: string;
  createdAt:string
};

export default function Journals() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournals,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading journals</p>;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Journals</h1>
        <AddJournal />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-2 max-w-md
        focus-within:ring-2 focus-within:ring-green-500 bg-white">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search your thoughts..."
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((journal: JournalType) => (
          <Journal
            key={journal._id}
            id={journal._id}
            title={journal.title}
            content={journal.content}
  mood={journal.mood as "Happy" | "Sad" | "Neutral"}
            createdAt={journal.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

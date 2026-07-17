"use client";
import UpdateJournal from "./UpdateJournal";
import { Mood } from "@/types";

type JournalCardProps = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
};

const moodColors: Record<string, string> = {
  Happy: "bg-green-100 text-green-700",
  Sad: "bg-blue-100 text-blue-700",
  Neutral: "bg-gray-100 text-gray-600",
  Excited: "bg-purple-100 text-purple-700",
  Tired: "bg-yellow-100 text-yellow-700",
  Angry: "bg-red-100 text-red-700",
};

export default function JournalCard({
  id,
  title,
  content,
  mood,
  createdAt,
}: JournalCardProps) {

  return (
    <article className="card flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full uppercase shrink-0 ${
              moodColors[mood] || "bg-gray-100 text-gray-600"
            }`}
          >
            {mood}
          </span>
        </div>
        <p className="text-sm text-subtext leading-relaxed line-clamp-4">
          {content}
        </p>
        <time className="text-xs text-subtext" dateTime={createdAt}>
          {new Date(createdAt).toLocaleDateString()}
        </time>
      </div>
      <div className="flex justify-end mt-4">
        <UpdateJournal id={id} title={title} content={content} mood={mood} />
      </div>
    </article>
  );
}

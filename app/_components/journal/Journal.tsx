import UpdateJournal from "./UpdateJournal";
import { Mood } from "@/types";
import { useTranslations } from "next-intl";


type JournalProps = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
};

// Map moods to Tailwind classes
const moodColors: Record<string, string> = {
  Happy: "bg-green-100 text-green-700",
  Sad: "bg-blue-100 text-blue-700",
  Neutral: "bg-gray-100 text-gray-600",
  Excited: "bg-purple-100 text-purple-700",
  Tired: "bg-yellow-100 text-yellow-700",
  Angry: "bg-red-100 text-red-700",
};

export default function Journal({ id, title, content, mood, createdAt }: JournalProps) {
  const t = useTranslations("dashboard.journal");
  const tm = useTranslations("dashboard.tasks.priority"); // Reuse priority translations for mood if similar, or add own
  
  // Actually, mood has its own set in some plans, but for now let's just use raw or specific keys
  // Let's check messages/en.json for journal mood... It has modals.journal.create.moodPlaceholder but not specific mood list
  
  return (
    <div className="col-span-3 card flex flex-col justify-between
      ">

      {/* Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-lg font-semibold  line-clamp-1">
            {title}
          </h2>

          <span
            className={`px-3 py-1 text-xs font-medium rounded-full uppercase ${
              moodColors[mood] || "bg-gray-100 text-gray-600"
            }`}
          >
            {mood}
          </span>
        </div>

        <p className="text-sm text-subtext leading-relaxed line-clamp-4">
          {content}
        </p>

        <p className="text-xs text-subtext">{new Date(createdAt).toLocaleDateString()}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-4">
        <UpdateJournal
          id={id}
          title={title}
          content={content}
          mood={mood}
        />
      </div>
    </div>
  );
}

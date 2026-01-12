import UpdateJournal from "./UpdateJournal";

type JournalProps = {
  id: string;
  title: string;
  content: string;
  mood: "Happy" | "Sad" | "Neutral";
  createdAt: string;
};

// Map moods to Tailwind classes
const moodColors: Record<string, string> = {
  Happy: "bg-green-100 text-green-700",
  Sad: "bg-blue-100 text-blue-700",
  Neutral: "bg-gray-100 text-gray-600",
};

export default function Journal({ id, title, content, mood, createdAt }: JournalProps) {
  return (
    <div className="col-span-3 bg-white rounded-2xl border border-gray-200 p-5 flex flex-col justify-between
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      {/* Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
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

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {content}
        </p>

        <p className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
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

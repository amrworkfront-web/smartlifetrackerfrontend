'use client';
import { useAppSelector } from "@/app/store/hook";
import ProfileStats from "@/app/_components/ProfilesStats";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold" aria-hidden="true">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-sm text-subtext">{user?.email}</p>
        </div>
      </div>
      <ProfileStats />
    </div>
  );
}

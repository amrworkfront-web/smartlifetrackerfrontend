'use client'
import { useTranslations } from "next-intl";
import { useAppSelector } from '@/app/store/hook'
import ProfileStats from '@/app/_components/ProfilesStats'

export default function ProfilePage() {

  const t = useTranslations("dashboard.profile");
  const user = useAppSelector((state) => state.auth.user)
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-sm text-subtext">{user?.email}</p>
        </div>
      </div>

<div>
</div>
      {/* Stats */}
      <ProfileStats />

      {/* Info */}
      {/* <ProfileInfo /> */}
    </div>
  )
}


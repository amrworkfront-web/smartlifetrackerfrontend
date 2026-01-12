'use client'

import ProfileStats from '@/app/_components/ProfilesStats'
import ProfileInfo from '@/app/_components/ProfileInof'

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
          A
        </div>

        <div>
          <h1 className="text-xl font-bold">Amr Mohamed</h1>
          <p className="text-sm text-gray-500">amr@email.com</p>
        </div>
      </div>

      {/* Stats */}
      <ProfileStats />

      {/* Info */}
      <ProfileInfo />
    </div>
  )
}

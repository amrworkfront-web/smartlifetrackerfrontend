'use client'
import { useTranslations } from "next-intl";

import { useQuery } from '@tanstack/react-query'
import { CheckCircle, BookOpen, ClipboardList, Flame } from 'lucide-react'
import { getTasks } from '../utils/taskAPI'
import { getNotes } from '../utils/notesAPI'
import { getJournals } from '../utils/journalAPI'

export default function ProfileStats() {
  const t = useTranslations("dashboard.profile.stats");
  const { data:tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn:()=> getTasks(),
  })
  
  const { data:notes } = useQuery({
    queryKey: ['notes'],
    queryFn:()=> getNotes(),
  })
  const { data:journals } = useQuery({
    queryKey: ['journals'],
    queryFn:()=> getJournals(),
  })


  const totalTasks = tasks?.length
  const totalNotes = notes?.length
  const totalJournals= journals?.length
  const completedTasks = tasks?.filter((t:any) => t.status).length

  const stats = [
    { label: t('totalTasks'), value: totalTasks, icon: ClipboardList },
    { label: t('completed'), value: completedTasks, icon: CheckCircle },
    { label: t('journals'), value: totalJournals, icon: BookOpen },
    { label: t('notes'), value: totalNotes, icon: Flame },
  ]

  if (isLoading) {
    return <p className="text-sm ">{t('loading')}</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className=" p-4 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <stat.icon className="text-green-500" />
          <div>
            <p className="text-sm text-subtext">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

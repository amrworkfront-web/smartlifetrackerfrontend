'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircle, BookOpen, ClipboardList, Flame } from 'lucide-react'
import { getTasks } from '../utils/taskAPI'
import { getNotes } from '../utils/notesAPI'
import { getJournals } from '../utils/journalAPI'

export default function ProfileStats() {
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
  const completedTasks = tasks?.filter(t => t.status).length

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: ClipboardList },
    { label: 'Completed', value: completedTasks, icon: CheckCircle },
    { label: 'Journals', value: totalJournals, icon: BookOpen }, // مؤقت
    { label: 'Notes', value: totalNotes, icon: Flame },       // مؤقت
  ]

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading stats...</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <stat.icon className="text-green-500" />
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

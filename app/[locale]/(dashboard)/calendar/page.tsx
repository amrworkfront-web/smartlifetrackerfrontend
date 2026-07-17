'use client'
import { useTranslations } from "next-intl";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function CalendarPage() {
  const t = useTranslations("dashboard.calendar");
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">{t("title")}</h1>
      <div className="rounded-2xl shadow-md border p-4 md:p-6">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
        />
      </div>
    </div>
  )
}

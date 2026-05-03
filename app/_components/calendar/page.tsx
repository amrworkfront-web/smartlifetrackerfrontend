'use client'
import { useTranslations } from "next-intl";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Page() {
  const t = useTranslations("dashboard.calendar");
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      <div className="
        max-w-6xl mx-auto
        rounded-2xl
        shadow-sm border
        p-4 md:p-6
      ">
        
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          {t("title")}
        </h1>

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

'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
      <div className="
        max-w-6xl mx-auto
        bg-white rounded-2xl
        shadow-sm border
        p-4 md:p-6
      ">
        
        <h1 className="text-xl md:text-2xl font-semibold mb-4">
          Calendar
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

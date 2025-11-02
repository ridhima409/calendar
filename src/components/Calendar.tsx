import React, { useState } from 'react'

type DayCell = {
  date: Date | null
  inMonth: boolean
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addMonths(d: Date, months: number) {
  const nd = new Date(d)
  nd.setMonth(nd.getMonth() + months)
  return nd
}

export default function Calendar() {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))
  const [selected, setSelected] = useState<Date | null>(null)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()

  const firstDay = startOfMonth(cursor)
  const lastDay = endOfMonth(cursor)

  const startWeekday = firstDay.getDay() // 0 (Sun) - 6 (Sat)
  const daysInMonth = lastDay.getDate()

  const cells: DayCell[] = []

  // previous month's tail
  const prevMonthLast = new Date(year, month, 0).getDate()
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevMonthLast - i),
      inMonth: false
    })
  }

  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, month, d),
      inMonth: true
    })
  }

  // next month's head
  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - (startWeekday + daysInMonth) + 1
    cells.push({
      date: new Date(year, month + 1, nextDay),
      inMonth: false
    })
  }

  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <button
            onClick={() => setCursor(c => addMonths(c, -1))}
            className="px-3 py-1 rounded-lg hover:bg-gray-100"
            aria-label="Previous Month"
          >◀</button>
          <button
            onClick={() => setCursor(startOfMonth(new Date()))}
            className="ml-2 px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Today
          </button>
          <button
            onClick={() => setCursor(c => addMonths(c, 1))}
            className="ml-2 px-3 py-1 rounded-lg hover:bg-gray-100"
            aria-label="Next Month"
          >▶</button>
        </div>
        <div className="text-lg font-medium">
          {cursor.toLocaleString(undefined, { month: 'long' })} {year}
        </div>
        <div/>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {weekdays.map(w => (
          <div key={w} className="text-center font-medium text-gray-600">{w}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
        {cells.map((cell, idx) => {
          const isToday =
            cell.date &&
            new Date().toDateString() === cell.date.toDateString()
          const isSelected =
            selected && cell.date && selected.toDateString() === cell.date.toDateString()

          return (
            <button
              key={idx}
              onClick={() => setSelected(cell.date)}
              className={[
                'p-3 min-h-[64px] text-left rounded-lg',
                cell.inMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                isToday ? 'ring-2 ring-indigo-300' : '',
                isSelected ? 'bg-indigo-600 text-white' : ''
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  {cell.date ? cell.date.getDate() : ''}
                </div>
                {/* place for a small dot / event indicator */}
                <div className="w-2 h-2 rounded-full bg-transparent"></div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {isSelected ? 'Selected' : ''}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

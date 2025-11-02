import React from 'react'
import Calendar from './components/Calendar'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-4">Calendar UI</h1>
          <Calendar />
        </div>
      </div>
    </div>
  )
}

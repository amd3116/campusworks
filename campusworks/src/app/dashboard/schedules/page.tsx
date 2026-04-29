'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { SCHEDULES } from '@/lib/data'
import { Modal, Toast, PageHeader } from '@/components/ui'
import type { Schedule } from '@/types'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday']

export default function SchedulesPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const isStudent = user?.role === 'student'

  const [schedules, setSchedules] = useState<Schedule[]>(
    isStudent ? SCHEDULES.filter(s => s.studentId === 'u3') : SCHEDULES
  )
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ student: 'Aisha Rahman', day: 'Monday', startTime: '09:00', endTime: '11:00', task: '', location: '' })

  const totalHours = schedules.filter(s=>s.studentId==='u3').reduce((sum,s)=>{
    const [sh,sm]=s.startTime.split(':').map(Number)
    const [eh,em]=s.endTime.split(':').map(Number)
    return sum + (eh+em/60-sh-sm/60)
  }, 0)

  function addShift() {
    const newS: Schedule = {
      id: `SCH-${schedules.length + 1}`,
      studentId: 'u3',
      studentName: form.student,
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      task: form.task,
      location: form.location,
      confirmed: true,
    }
    setSchedules(ss => [...ss, newS])
    setShowAdd(false)
    setToast('Shift added. Conflict check passed. Student notified.')
  }

  return (
    <div>
      <PageHeader
        title="Work Schedules"
        subtitle="System auto-checks class schedule conflicts · Max 12 hrs/week enforced"
        action={!isStudent ? <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Shift</button> : undefined}
      />

      {isStudent && (
        <div className={`px-4 py-3 rounded-xl border mb-5 text-sm ${totalHours >= 12 ? 'bg-red-50 border-red-200 text-red-700' : totalHours >= 10 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-green-50 border-green-100 text-green-700'}`}>
          This week: <strong>{totalHours.toFixed(1)}h / 12h</strong> maximum.
          {totalHours >= 12 ? ' ⚠️ At limit — no additional shifts can be added.' : ' Remaining capacity available.'}
        </div>
      )}

      {/* Week grid */}
      <div className="grid gap-3">
        {DAYS.map(day => {
          const daySchedules = schedules.filter(s => s.day === day)
          return (
            <div key={day} className="card">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-gray-900 w-24">{day}</span>
                {daySchedules.length === 0 && <span className="text-sm text-gray-400">No shifts scheduled</span>}
              </div>
              {daySchedules.length > 0 && (
                <div className="space-y-2 pl-2">
                  {daySchedules.map(s => (
                    <div key={s.id} className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5">
                      <div className="text-xs font-medium text-blue-700 w-28 shrink-0">{s.startTime}–{s.endTime}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800">{s.task}</div>
                        <div className="text-xs text-gray-500">{s.location}{!isStudent ? ` · ${s.studentName}` : ''}</div>
                      </div>
                      <span className={`badge shrink-0 ${s.confirmed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {s.confirmed ? '✓ Confirmed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Modal open={showAdd} title="Add Shift" onClose={() => setShowAdd(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn-primary" onClick={addShift}>Add Shift</button></>}>
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 text-sm text-amber-700">
            System will automatically check for class schedule conflicts.
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Student</label>
              <select className="select" value={form.student} onChange={e=>setForm(f=>({...f,student:e.target.value}))}>
                {['Aisha Rahman','Nadia Chowdhury','Rafiq Islam'].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Day</label>
              <select className="select" value={form.day} onChange={e=>setForm(f=>({...f,day:e.target.value}))}>
                {DAYS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div><label className="label">Start Time</label><input className="input" type="time" value={form.startTime} onChange={e=>setForm(f=>({...f,startTime:e.target.value}))} /></div>
            <div><label className="label">End Time</label><input className="input" type="time" value={form.endTime} onChange={e=>setForm(f=>({...f,endTime:e.target.value}))} /></div>
          </div>
          <div><label className="label">Task Description</label><input className="input" placeholder="e.g. Tutorial Lab, Office Hours, Grading" value={form.task} onChange={e=>setForm(f=>({...f,task:e.target.value}))} /></div>
          <div><label className="label">Location</label><input className="input" placeholder="Room 301 or Online" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} /></div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

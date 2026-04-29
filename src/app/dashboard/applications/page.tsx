'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { APPLICATIONS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import type { Application } from '@/types'

export default function ApplicationsPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const [apps, setApps] = useState<Application[]>(
    user?.role === 'student' ? APPLICATIONS.filter(a => a.studentId === 'u3') : APPLICATIONS
  )
  const [interviewModal, setInterviewModal] = useState<Application | null>(null)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [iForm, setIForm] = useState({ date: '', time: '10:00', mode: 'In-person', room: '', instructions: '' })

  const filtered = apps.filter(a =>
    (statusFilter === 'all' || a.status === statusFilter) &&
    (a.studentName.toLowerCase().includes(search.toLowerCase()) || a.circularTitle.toLowerCase().includes(search.toLowerCase()))
  )

  function updateStatus(id: string, status: Application['status']) {
    setApps(as => as.map(a => a.id === id ? { ...a, status } : a))
    const msgs: Record<string, string> = {
      shortlisted: 'Candidate shortlisted. Student notified.',
      selected: 'Candidate selected! Offer sent. HR notified.',
      rejected: 'Application rejected. Student notified.',
      interview: 'Interview invitation sent. Student & department notified.',
    }
    setToast(msgs[status] || 'Status updated.')
    setInterviewModal(null)
  }

  const statusCounts = {
    all: apps.length,
    applied: apps.filter(a => a.status === 'applied').length,
    shortlisted: apps.filter(a => a.status === 'shortlisted').length,
    interview: apps.filter(a => a.status === 'interview').length,
    selected: apps.filter(a => a.status === 'selected').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  }

  return (
    <div>
      <PageHeader title="Applications" subtitle="System-checked for CGPA ≥ 3.0, eligibility & prior work rules" />

      {/* Status tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {Object.entries(statusCounts).map(([s, count]) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input className="input max-w-sm" placeholder="Search by name or position..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">Student</th>
                <th className="table-header">Position</th>
                <th className="table-header">Dept</th>
                <th className="table-header">CGPA</th>
                <th className="table-header">Applied</th>
                <th className="table-header">Status</th>
                {user?.role !== 'student' && <th className="table-header">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium shrink-0">
                        {a.studentName.split(' ').map(x => x[0]).join('').slice(0,2)}
                      </div>
                      <span className="font-medium">{a.studentName}</span>
                    </div>
                  </td>
                  <td className="table-cell text-gray-600 max-w-[180px] truncate">{a.circularTitle}</td>
                  <td className="table-cell text-gray-500">{a.department}</td>
                  <td className="table-cell">
                    <span className={`font-medium ${a.cgpa >= 3.7 ? 'text-emerald-600' : a.cgpa >= 3.0 ? 'text-blue-600' : 'text-red-600'}`}>{a.cgpa}</span>
                  </td>
                  <td className="table-cell text-gray-400">{a.appliedAt}</td>
                  <td className="table-cell"><Badge status={a.status} /></td>
                  {user?.role !== 'student' && (
                    <td className="table-cell">
                      <div className="flex gap-1.5 flex-wrap">
                        {a.status === 'applied' && (
                          <>
                            <button className="btn-success" onClick={() => updateStatus(a.id, 'shortlisted')}>Shortlist</button>
                            <button className="btn-danger" onClick={() => updateStatus(a.id, 'rejected')}>Reject</button>
                          </>
                        )}
                        {a.status === 'shortlisted' && (
                          <>
                            <button className="btn-primary text-xs py-1.5 px-3" onClick={() => setInterviewModal(a)}>Schedule Interview</button>
                            <button className="btn-success" onClick={() => updateStatus(a.id, 'selected')}>Select</button>
                          </>
                        )}
                        {a.status === 'interview' && (
                          <button className="btn-success" onClick={() => updateStatus(a.id, 'selected')}>Select</button>
                        )}
                        {(a.status === 'selected' || a.status === 'rejected') && (
                          <span className="text-xs text-gray-400">Final</span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400">No applications found.</div>
          )}
        </div>
      </div>

      {/* Interview Modal */}
      <Modal open={!!interviewModal} title={`Schedule Interview – ${interviewModal?.studentName}`} onClose={() => setInterviewModal(null)}
        footer={<><button className="btn-secondary" onClick={() => setInterviewModal(null)}>Cancel</button><button className="btn-primary" onClick={() => updateStatus(interviewModal!.id, 'interview')}>Send Invite</button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Date</label><input className="input" type="date" value={iForm.date} onChange={e => setIForm(f => ({...f, date: e.target.value}))} /></div>
            <div><label className="label">Time</label><input className="input" type="time" value={iForm.time} onChange={e => setIForm(f => ({...f, time: e.target.value}))} /></div>
            <div>
              <label className="label">Mode</label>
              <select className="select" value={iForm.mode} onChange={e => setIForm(f => ({...f, mode: e.target.value}))}>
                {['In-person','Online (Zoom)','Skill Test','Mock Task'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div><label className="label">Room / Link</label><input className="input" placeholder="Room 301 or Zoom link" value={iForm.room} onChange={e => setIForm(f => ({...f, room: e.target.value}))} /></div>
          </div>
          <div><label className="label">Instructions for Candidate</label><textarea className="input h-20 resize-none" placeholder="Please bring transcript and portfolio..." value={iForm.instructions} onChange={e => setIForm(f => ({...f, instructions: e.target.value}))} /></div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

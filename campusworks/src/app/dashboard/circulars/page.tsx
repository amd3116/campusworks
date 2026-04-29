'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { JOB_CIRCULARS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import type { JobCircular } from '@/types'

export default function CircularsPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const [circulars, setCirculars] = useState<JobCircular[]>(JOB_CIRCULARS)
  const [applyModal, setApplyModal] = useState<JobCircular | null>(null)
  const [toast, setToast] = useState('')
  const [coverNote, setCoverNote] = useState('')
  const [skills, setSkills] = useState('')
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const filtered = circulars.filter(c =>
    (deptFilter === 'All' || c.department === deptFilter) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.department.toLowerCase().includes(search.toLowerCase()))
  )

  function applyNow() {
    if (!applyModal) return
    setCirculars(cs => cs.map(c => c.id === applyModal.id ? { ...c, applicants: c.applicants + 1 } : c))
    setApplyModal(null)
    setToast('Application submitted! Confirmation sent to your email.')
  }

  const depts = ['All', ...Array.from(new Set(circulars.map(c => c.department)))]

  return (
    <div>
      <PageHeader title="Job Circulars" subtitle="Available on-campus employment opportunities" />

      {/* Search & filter */}
      <div className="flex gap-3 mb-5">
        <input className="input flex-1" placeholder="Search positions..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select w-48" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map(c => (
          <div key={c.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <Badge status={c.status} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{c.department}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{c.description}</p>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                  <span>🎯 {c.slotsAvailable} positions</span>
                  <span>📋 {c.applicants} applicants</span>
                  <span>⏰ Max {c.hoursPerWeek} hrs/week</span>
                  <span>💰 ৳{c.payRate}/hr</span>
                  <span>📅 Deadline: {c.deadline}</span>
                  <span>📊 Min CGPA: {c.minCgpa}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="badge bg-blue-100 text-blue-700">Hourly Pay</span>
                  <span className="badge bg-purple-100 text-purple-700">On-campus</span>
                  {user?.cgpa >= c.minCgpa && <span className="badge bg-green-100 text-green-700">✓ Eligible</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                {user?.role === 'student' && c.status === 'open' ? (
                  <button className="btn-primary" onClick={() => setApplyModal(c)}>Apply Now</button>
                ) : user?.role !== 'student' ? (
                  <button className="btn-secondary text-sm">{c.applicants} Applicants</button>
                ) : (
                  <span className="text-xs text-gray-400 text-center">Closed</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium text-gray-600">No circulars found</div>
            <div className="text-sm mt-1">Try adjusting your search or filter</div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <Modal open={!!applyModal} title={`Apply: ${applyModal?.title}`} onClose={() => setApplyModal(null)}
        footer={<><button className="btn-secondary" onClick={() => setApplyModal(null)}>Cancel</button><button className="btn-primary" onClick={applyNow}>Submit Application</button></>}>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-green-700">
            ✓ Your profile has been auto-filled from university records (CGPA: {user?.cgpa}, ID: {user?.studentId}).
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Student ID (auto)</label>
              <input className="input bg-gray-50" value={user?.studentId || 'STU-2021-0847'} readOnly />
            </div>
            <div>
              <label className="label">CGPA (auto)</label>
              <input className="input bg-gray-50" value={user?.cgpa || 3.8} readOnly />
            </div>
          </div>
          <div>
            <label className="label">Relevant Skills</label>
            <input className="input" placeholder="e.g. Python, Teaching, Data Analysis" value={skills} onChange={e => setSkills(e.target.value)} />
          </div>
          <div>
            <label className="label">Cover Note (optional)</label>
            <textarea className="input h-24 resize-none" placeholder="Why are you a good fit for this role?" value={coverNote} onChange={e => setCoverNote(e.target.value)} />
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

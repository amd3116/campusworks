'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TIMESHEETS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import type { Timesheet } from '@/types'

export default function TimesheetsPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const isStudent = user?.role === 'student'

  const [sheets, setSheets] = useState<Timesheet[]>(
    isStudent ? TIMESHEETS.filter(t => t.studentId === 'u3') : TIMESHEETS
  )
  const [showSubmit, setShowSubmit] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ weekStart: '', weekEnd: '', hours: 10, summary: '' })
  const [reviewNote, setReviewNote] = useState('')
  const [reviewTarget, setReviewTarget] = useState<{ id: string; action: 'approved' | 'rejected' } | null>(null)

  function submit() {
    const newTs: Timesheet = {
      id: `TS-00${sheets.length + 1}`,
      contractId: 'CON-001',
      studentId: 'u3',
      studentName: 'Aisha Rahman',
      ...form,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    }
    setSheets(ts => [newTs, ...ts])
    setShowSubmit(false)
    setForm({ weekStart: '', weekEnd: '', hours: 10, summary: '' })
    setToast('Timesheet submitted. Supervisor notified for review.')
  }

  function review() {
    if (!reviewTarget) return
    setSheets(ts => ts.map(t => t.id === reviewTarget.id ? {
      ...t,
      status: reviewTarget.action,
      reviewedAt: new Date().toISOString().split('T')[0],
      reviewNote,
    } : t))
    setReviewTarget(null)
    setReviewNote('')
    setToast(reviewTarget.action === 'approved'
      ? 'Timesheet approved. Student notified. Hours sent to payroll.'
      : 'Timesheet rejected. Student notified with feedback.')
  }

  const pending = sheets.filter(t => t.status === 'pending').length
  const totalApprovedHours = sheets.filter(t => t.status === 'approved').reduce((s, t) => s + t.hours, 0)

  return (
    <div>
      <PageHeader
        title="Timesheets"
        subtitle={isStudent ? 'Submit and track your weekly work hours' : 'Review and approve student timesheets'}
        action={isStudent ? <button className="btn-primary" onClick={() => setShowSubmit(true)}>+ Submit Timesheet</button> : undefined}
      />

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="stat-card"><div className="text-2xl font-semibold text-amber-600">{pending}</div><div className="text-xs text-gray-500 mt-1">Pending Review</div></div>
        <div className="stat-card"><div className="text-2xl font-semibold text-emerald-600">{sheets.filter(t=>t.status==='approved').length}</div><div className="text-xs text-gray-500 mt-1">Approved</div></div>
        <div className="stat-card"><div className="text-2xl font-semibold text-blue-600">{totalApprovedHours}h</div><div className="text-xs text-gray-500 mt-1">Total Approved Hours</div></div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {!isStudent && <th className="table-header">Student</th>}
                <th className="table-header">Week</th>
                <th className="table-header">Hours</th>
                <th className="table-header">Summary</th>
                <th className="table-header">Submitted</th>
                <th className="table-header">Status</th>
                {!isStudent && <th className="table-header">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sheets.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  {!isStudent && <td className="table-cell font-medium">{t.studentName}</td>}
                  <td className="table-cell text-gray-600">{t.weekStart} – {t.weekEnd}</td>
                  <td className="table-cell">
                    <span className={`font-semibold ${t.hours > 10 ? 'text-amber-600' : 'text-gray-800'}`}>{t.hours}h</span>
                    <span className="text-gray-400 text-xs">/12</span>
                  </td>
                  <td className="table-cell text-gray-500 max-w-[200px] truncate">{t.summary}</td>
                  <td className="table-cell text-gray-400">{t.submittedAt}</td>
                  <td className="table-cell"><Badge status={t.status} /></td>
                  {!isStudent && (
                    <td className="table-cell">
                      {t.status === 'pending' ? (
                        <div className="flex gap-1.5">
                          <button className="btn-success" onClick={() => setReviewTarget({ id: t.id, action: 'approved' })}>Approve</button>
                          <button className="btn-danger" onClick={() => setReviewTarget({ id: t.id, action: 'rejected' })}>Reject</button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">{t.reviewedAt}</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Timesheet Modal */}
      <Modal open={showSubmit} title="Submit Timesheet" onClose={() => setShowSubmit(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowSubmit(false)}>Cancel</button><button className="btn-primary" onClick={submit}>Submit</button></>}>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-sm text-blue-700">⚠️ Maximum 12 hours per week enforced.</div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Week Start</label><input className="input" type="date" value={form.weekStart} onChange={e => setForm(f => ({...f, weekStart: e.target.value}))} /></div>
            <div><label className="label">Week End</label><input className="input" type="date" value={form.weekEnd} onChange={e => setForm(f => ({...f, weekEnd: e.target.value}))} /></div>
          </div>
          <div>
            <label className="label">Total Hours (max 12)</label>
            <input className="input" type="number" min={1} max={12} value={form.hours} onChange={e => setForm(f => ({...f, hours: Math.min(12, +e.target.value)}))} />
          </div>
          <div><label className="label">Work Summary</label><textarea className="input h-24 resize-none" placeholder="Describe tasks completed this week..." value={form.summary} onChange={e => setForm(f => ({...f, summary: e.target.value}))} /></div>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal open={!!reviewTarget} title={`${reviewTarget?.action === 'approved' ? 'Approve' : 'Reject'} Timesheet`} onClose={() => setReviewTarget(null)}
        footer={<><button className="btn-secondary" onClick={() => setReviewTarget(null)}>Cancel</button><button className={reviewTarget?.action === 'approved' ? 'btn-success' : 'btn-danger'} onClick={review}>{reviewTarget?.action === 'approved' ? 'Approve' : 'Reject'}</button></>}>
        <div className="space-y-3">
          <div><label className="label">Review Note (optional)</label><textarea className="input h-20 resize-none" placeholder="Add any feedback for the student..." value={reviewNote} onChange={e => setReviewNote(e.target.value)} /></div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

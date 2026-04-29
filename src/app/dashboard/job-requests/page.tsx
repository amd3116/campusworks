'use client'
import { useState } from 'react'
import { JOB_REQUESTS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { JobRequest } from '@/types'

export default function JobRequestsPage() {
  const [requests, setRequests] = useState<JobRequest[]>(JOB_REQUESTS)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ department: 'Computer Science', role: 'Teaching Assistant', jobModel: 'Teaching Assistant', hoursPerWeek: 10, budget: 60000, description: '', startDate: '', duration: '1 Semester' })

  function approve(id: string) {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'approved' } : r))
    setToast('Job request approved. Department notified.')
  }
  function reject(id: string) {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
    setToast('Job request rejected. Department notified.')
  }
  function submit() {
    const newReq: JobRequest = {
      id: `JR-00${requests.length + 1}`,
      ...form,
      jobModel: form.jobModel as any,
      status: 'pending',
      submittedBy: 'u2',
      date: new Date().toISOString().split('T')[0],
    }
    setRequests(rs => [newReq, ...rs])
    setShowModal(false)
    setToast('Job request submitted. Dept Head & HR notified.')
  }

  return (
    <div>
      <PageHeader
        title="Job Requests"
        subtitle="Department submissions for student employment positions"
        action={<button className="btn-primary" onClick={() => setShowModal(true)}>+ New Request</button>}
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[['Total', requests.length], ['Pending', requests.filter(r=>r.status==='pending').length], ['Approved', requests.filter(r=>r.status==='approved').length]].map(([l,v])=>(
          <div key={l} className="stat-card text-center">
            <div className="text-2xl font-semibold text-gray-900">{v}</div>
            <div className="text-xs text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">ID</th>
                <th className="table-header">Department</th>
                <th className="table-header">Role</th>
                <th className="table-header">Model</th>
                <th className="table-header">Hrs/Wk</th>
                <th className="table-header">Budget</th>
                <th className="table-header">Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-blue-600">{r.id}</td>
                  <td className="table-cell">{r.department}</td>
                  <td className="table-cell font-medium">{r.role}</td>
                  <td className="table-cell text-gray-500">{r.jobModel}</td>
                  <td className="table-cell">{r.hoursPerWeek}h</td>
                  <td className="table-cell">{formatCurrency(r.budget)}</td>
                  <td className="table-cell text-gray-400">{r.date}</td>
                  <td className="table-cell"><Badge status={r.status} /></td>
                  <td className="table-cell">
                    <div className="flex gap-2">
                      {r.status === 'pending' && (
                        <>
                          <button className="btn-success" onClick={() => approve(r.id)}>Approve</button>
                          <button className="btn-danger" onClick={() => reject(r.id)}>Reject</button>
                        </>
                      )}
                      {r.status !== 'pending' && (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showModal} title="New Job Request" onClose={() => setShowModal(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button><button className="btn-primary" onClick={submit}>Submit Request</button></>}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Department</label>
              <select className="select" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
                {['Computer Science','Physics','Library','Biology','Admin Office','Engineering'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Role Title</label>
              <input className="input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Lab Assistant" />
            </div>
            <div>
              <label className="label">Job Model</label>
              <select className="select" value={form.jobModel} onChange={e => setForm(f => ({ ...f, jobModel: e.target.value }))}>
                {['Teaching Assistant','Research Assistant','Student Associate','Paid Volunteer'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Hours / Week (max 12)</label>
              <input className="input" type="number" min={1} max={12} value={form.hoursPerWeek} onChange={e => setForm(f => ({ ...f, hoursPerWeek: +e.target.value }))} />
            </div>
            <div>
              <label className="label">Annual Budget (৳)</label>
              <input className="input" type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: +e.target.value }))} />
            </div>
            <div>
              <label className="label">Duration</label>
              <select className="select" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                {['1 Semester','2 Semesters','1 Year'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Job Description</label>
            <textarea className="input h-24 resize-none" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe duties, requirements, and expectations..." />
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

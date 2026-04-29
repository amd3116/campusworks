'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PERFORMANCE_REVIEWS } from '@/lib/data'
import { Modal, Toast, PageHeader, ScoreBar } from '@/components/ui'
import type { PerformanceReview } from '@/types'

export default function PerformancePage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const isStudent = user?.role === 'student'

  const [reviews, setReviews] = useState<PerformanceReview[]>(
    isStudent ? PERFORMANCE_REVIEWS.filter(r => r.studentId === 'u3') : PERFORMANCE_REVIEWS
  )
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ studentName: 'Aisha Rahman', period: 'April 2024', overallScore: 4.0, taskScore: 4.0, punctualityScore: 4.0, communicationScore: 4.0, qualityScore: 4.0, initiativeScore: 4.0, comments: '' })

  function save() {
    const newReview: PerformanceReview = {
      id: `PR-00${reviews.length + 1}`,
      studentId: 'u3',
      supervisorId: 'u2',
      createdAt: new Date().toISOString().split('T')[0],
      ...form,
    }
    setReviews(rs => [newReview, ...rs])
    setShowAdd(false)
    setToast('Performance review saved. Student notified of feedback.')
  }

  const scoreColor = (s: number) => s >= 4.5 ? 'text-emerald-600' : s >= 3.5 ? 'text-blue-600' : 'text-amber-600'

  return (
    <div>
      <PageHeader
        title="Performance Reviews"
        subtitle="Semester & monthly evaluations stored in student profile"
        action={!isStudent ? <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Review</button> : undefined}
      />

      <div className="space-y-5">
        {reviews.map(r => (
          <div key={r.id} className="card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                    {r.studentName.split(' ').map(x=>x[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.studentName}</div>
                    <div className="text-xs text-gray-400">{r.period} · Reviewed {r.createdAt}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-semibold ${scoreColor(r.overallScore)}`}>{r.overallScore}</div>
                <div className="text-xs text-gray-400">/ 5.0 overall</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 mb-4">
              {[
                ['Task Completion', r.taskScore],
                ['Punctuality', r.punctualityScore],
                ['Communication', r.communicationScore],
                ['Quality of Work', r.qualityScore],
                ['Initiative', r.initiativeScore],
              ].map(([label, score]) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                  <ScoreBar score={Number(score)} />
                </div>
              ))}
            </div>

            {r.comments && (
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 border-l-4 border-blue-300">
                <div className="text-xs font-semibold text-gray-400 mb-1">Supervisor Comments</div>
                {r.comments}
              </div>
            )}
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="card text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">⭐</div>
            <div className="font-medium text-gray-600">No reviews yet</div>
            <div className="text-sm mt-1">Performance reviews will appear here after evaluation.</div>
          </div>
        )}
      </div>

      <Modal open={showAdd} title="Add Performance Review" onClose={() => setShowAdd(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button><button className="btn-primary" onClick={save}>Save Review</button></>}>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Student</label>
              <select className="select" value={form.studentName} onChange={e => setForm(f=>({...f,studentName:e.target.value}))}>
                {['Aisha Rahman','Nadia Chowdhury','Rafiq Islam'].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Period</label>
              <select className="select" value={form.period} onChange={e=>setForm(f=>({...f,period:e.target.value}))}>
                {['April 2024','March 2024','Semester Spring 2024'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {[['Overall Score',  'overallScore'],['Task Completion','taskScore'],['Punctuality','punctualityScore'],['Communication','communicationScore'],['Quality','qualityScore'],['Initiative','initiativeScore']].map(([label,key])=>(
            <div key={key} className="flex items-center gap-3">
              <label className="text-xs text-gray-500 w-36 shrink-0">{label}</label>
              <input type="range" min="1" max="5" step="0.1" className="flex-1" value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:+e.target.value}))} />
              <span className="text-sm font-medium w-8 text-right">{(form as any)[key].toFixed(1)}</span>
            </div>
          ))}
          <div><label className="label">Comments</label><textarea className="input h-24 resize-none" placeholder="Provide detailed feedback..." value={form.comments} onChange={e=>setForm(f=>({...f,comments:e.target.value}))} /></div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

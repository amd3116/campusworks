'use client'
import { useState } from 'react'
import { TALENT_POOL } from '@/lib/data'
import { Toast, PageHeader } from '@/components/ui'
import type { TalentProfile } from '@/types'

export default function TalentPage() {
  const [talent, setTalent] = useState<TalentProfile[]>(TALENT_POOL)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = talent.filter(t =>
    (filter === 'all' || (filter === 'available' ? t.available : !t.available)) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.department.toLowerCase().includes(search.toLowerCase()) || t.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  )

  function assign(name: string) {
    setToast(`${name} assigned. Backup pool updated. Student notified.`)
  }

  const scoreColor = (s: number) => s >= 90 ? 'text-emerald-600' : s >= 80 ? 'text-blue-600' : s >= 70 ? 'text-amber-600' : 'text-gray-500'
  const scoreBg = (s: number) => s >= 90 ? 'bg-emerald-50 border-emerald-200' : s >= 80 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'

  return (
    <div>
      <PageHeader
        title="Talent Pool"
        subtitle="AI-powered matching – student profiles, skills & work history for future assignments"
      />

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700 mb-5">
        🤖 <strong>AI Scoring:</strong> Each student receives a score (0–100) based on CGPA (30%), work experience (25%), performance history (25%), and skill breadth (20%). Higher scores are prioritized for new openings.
      </div>

      <div className="flex gap-3 mb-5">
        <input className="input flex-1" placeholder="Search by name, department, or skill..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="select w-40" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Students</option>
          <option value="available">Available</option>
          <option value="placed">Currently Placed</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(t => (
          <div key={t.userId} className={`card hover:shadow-md transition-shadow border ${t.available ? 'border-emerald-100' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold shrink-0">
                  {t.name.split(' ').map(x=>x[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.department} · CGPA {t.cgpa}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.workHistory} · {t.totalHours > 0 ? `${t.totalHours}h worked` : 'New'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`text-center border rounded-xl px-4 py-2 ${scoreBg(t.aiScore)}`}>
                  <div className={`text-2xl font-bold ${scoreColor(t.aiScore)}`}>{t.aiScore}</div>
                  <div className="text-xs text-gray-400">AI Score</div>
                </div>
                {t.avgPerformance > 0 && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-amber-600">{t.avgPerformance}/5</div>
                    <div className="text-xs text-gray-400">Avg Rating</div>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className={`badge ${t.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.available ? '✓ Available' : 'Placed'}
                  </span>
                  <button className="btn-secondary text-xs" onClick={() => assign(t.name)}>Assign</button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-50">
              {t.skills.map(skill => (
                <span key={skill} className="badge bg-gray-100 text-gray-600 text-xs">{skill}</span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🎓</div>
            <div className="font-medium text-gray-600">No students match your search</div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

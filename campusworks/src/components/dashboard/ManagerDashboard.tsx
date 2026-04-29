import { StatCard } from '@/components/ui'
import { APPLICATIONS, TIMESHEETS, SCHEDULES, CONTRACTS, PAYMENTS, PERFORMANCE_REVIEWS } from '@/lib/data'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export function ManagerDashboard({ user }: { user: any }) {
  const pending = TIMESHEETS.filter(t => t.status === 'pending').length
  const openApps = APPLICATIONS.filter(a => a.status === 'applied').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="My Team" value={8} sub="2 new joiners" color="text-blue-600" />
        <StatCard label="Open Applications" value={openApps} sub="Pending review" color="text-amber-600" />
        <StatCard label="Timesheets Due" value={pending} sub="Action needed" color="text-red-600" />
        <StatCard label="This Week Hours" value="86h" sub="Logged" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-semibold mb-4">Pending Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Review new applications', count: openApps, href: '/dashboard/applications', color: 'text-blue-600 bg-blue-50' },
              { label: 'Approve timesheets', count: pending, href: '/dashboard/timesheets', color: 'text-amber-600 bg-amber-50' },
              { label: 'Add performance reviews', count: 2, href: '/dashboard/performance', color: 'text-purple-600 bg-purple-50' },
            ].map(a => (
              <Link key={a.label} href={a.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                <span className="text-sm text-gray-700">{a.label}</span>
                <span className={`badge ${a.color}`}>{a.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l: '+ Job Request', href: '/dashboard/job-requests', p: true },
              { l: 'View Circulars', href: '/dashboard/circulars', p: false },
              { l: 'Approve Timesheets', href: '/dashboard/timesheets', p: false },
              { l: 'Analytics', href: '/dashboard/analytics', p: false },
            ].map(a => (
              <Link key={a.l} href={a.href} className={a.p ? 'btn-primary text-center py-2 text-sm' : 'btn-secondary text-center py-2 text-sm'}>{a.l}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="table-header rounded-tl-lg">Student</th>
              <th className="table-header">Position</th>
              <th className="table-header">CGPA</th>
              <th className="table-header rounded-tr-lg">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {APPLICATIONS.slice(0, 4).map(a => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium">{a.studentName}</td>
                  <td className="table-cell text-gray-500">{a.circularTitle}</td>
                  <td className="table-cell">{a.cgpa}</td>
                  <td className="table-cell">
                    <span className={`badge ${a.status === 'shortlisted' ? 'bg-blue-100 text-blue-700' : a.status === 'selected' ? 'bg-green-100 text-green-700' : a.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function StudentDashboard({ user }: { user: any }) {
  const mySchedules = SCHEDULES.filter(s => s.studentId === 'u3')
  const myPayments = PAYMENTS.filter(p => p.studentId === 'u3')
  const myContract = CONTRACTS.find(c => c.studentId === 'u3')
  const myReview = PERFORMANCE_REVIEWS.find(r => r.studentId === 'u3')

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
        <strong>Welcome back, {user.name?.split(' ')[0]}!</strong> You have an interview scheduled on <strong>April 2</strong> for Teaching Assistant – CS101.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Current Role" value="TA" sub="Teaching Assistant · Active" color="text-blue-600" />
        <StatCard label="Hours This Week" value="11h" sub="/ 12 max" color="text-emerald-600" />
        <StatCard label="Last Payment" value={formatCurrency(myPayments[0]?.amount || 0)} sub="February 2024 · Paid" color="text-emerald-600" />
        <StatCard label="Performance" value={`${myReview?.overallScore || '—'}/5`} sub="Excellent rating" color="text-amber-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* My profile */}
        <div className="card">
          <h3 className="font-semibold mb-4">My Profile <span className="text-xs text-gray-400 font-normal">(auto-filled from university records)</span></h3>
          <div className="space-y-2.5">
            {[
              ['Student ID', user.studentId || 'STU-2021-0847'],
              ['Department', user.department || 'Computer Science'],
              ['Semester', `${user.semester || 8}th`],
              ['CGPA', user.cgpa || 3.8],
              ['Work Model', myContract?.jobModel || 'Teaching Assistant'],
              ['Pay Rate', `৳${myContract?.hourlyRate || 400}/hr`],
              ['Max Hours / Week', '12 hrs'],
              ['Contract Ends', myContract?.endDate || 'June 2024'],
            ].map(([l, v]) => (
              <div key={l} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-500">{l}</span>
                <span className="text-sm font-medium text-gray-800">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Upcoming schedule */}
          <div className="card">
            <h3 className="font-semibold mb-3">Upcoming Schedule</h3>
            <div className="space-y-2">
              {mySchedules.map(s => (
                <div key={s.id} className="card-sm flex items-center gap-3">
                  <div className="text-xs font-semibold text-blue-600 w-8 shrink-0">{s.day.slice(0,3)}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{s.task}</div>
                    <div className="text-xs text-gray-400">{s.startTime}–{s.endTime} · {s.location}</div>
                  </div>
                  <span className="badge bg-green-100 text-green-700 shrink-0">✓</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/timesheets" className="btn-primary text-center py-2">Submit Timesheet</Link>
              <Link href="/dashboard/circulars" className="btn-secondary text-center py-2">Browse New Jobs</Link>
              <Link href="/dashboard/performance" className="btn-secondary text-center py-2">View Performance Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { StatCard } from '@/components/ui'
import { JOB_REQUESTS, APPLICATIONS, TIMESHEETS, PAYMENTS } from '@/lib/data'
import Link from 'next/link'

export function AdminDashboard({ user }: { user: any }) {
  const pending = JOB_REQUESTS.filter(r => r.status === 'pending').length
  const openApps = APPLICATIONS.filter(a => a.status === 'applied' || a.status === 'shortlisted').length
  const pendingTs = TIMESHEETS.filter(t => t.status === 'pending').length
  const totalPaid = PAYMENTS.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)

  const pipeline = [
    { label: 'Job Requests', n: 4, status: 'done', href: '/dashboard/job-requests' },
    { label: 'Approvals', n: '3 approved', status: 'done', href: '/dashboard/job-requests' },
    { label: 'Job Circulars', n: '3 active', status: 'done', href: '/dashboard/circulars' },
    { label: 'Applications', n: 23, status: 'done', href: '/dashboard/applications' },
    { label: 'Screening / Shortlist', n: '12 shortlisted', status: 'active', href: '/dashboard/applications' },
    { label: 'Interviews', n: 'Scheduled Apr 2–4', status: 'pending', href: '/dashboard/applications' },
    { label: 'Selection & Offers', n: '—', status: 'pending', href: '/dashboard/applications' },
    { label: 'Onboarding', n: '—', status: 'pending', href: '/dashboard/timesheets' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Active Students" value={47} sub="↑ 8 this semester" color="text-blue-600" />
        <StatCard label="Open Positions" value={12} sub="3 new postings" color="text-emerald-600" />
        <StatCard label="Pending Approvals" value={pending} sub="Needs action" color="text-amber-600" />
        <StatCard label="Hours (Mar)" value="432h" sub="↑ 12% vs last" />
        <StatCard label="Payments (Mar)" value="৳33.6K" sub="Processed" color="text-emerald-600" />
        <StatCard label="Avg CGPA" value="3.61" sub="↑ 0.12" color="text-blue-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pipeline */}
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Employment Pipeline</h3>
          <div className="space-y-2">
            {pipeline.map((step) => (
              <Link key={step.label} href={step.href}
                className={`flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors ${step.status === 'active' ? 'bg-blue-50 border border-blue-100' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                  ${step.status === 'done' ? 'bg-emerald-100 text-emerald-700' : step.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                  {step.status === 'done' ? '✓' : step.status === 'active' ? '●' : '○'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{step.label}</div>
                  <div className="text-xs text-gray-500">{step.n}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Quick actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '+ New Job Request', href: '/dashboard/job-requests', primary: true },
                { label: 'Review Applications', href: '/dashboard/applications', primary: false },
                { label: 'Approve Timesheets', href: '/dashboard/timesheets', primary: false },
                { label: 'Process Payments', href: '/dashboard/payments', primary: false },
                { label: 'View Analytics', href: '/dashboard/analytics', primary: false },
                { label: 'Talent Pool', href: '/dashboard/talent', primary: false },
              ].map(a => (
                <Link key={a.label} href={a.href}
                  className={a.primary ? 'btn-primary text-center text-sm py-2' : 'btn-secondary text-center text-sm py-2'}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="card space-y-2">
            <h3 className="font-semibold text-gray-900 mb-3">Needs Attention</h3>
            {[
              { text: `${pending} job request${pending !== 1 ? 's' : ''} pending approval`, color: 'border-amber-400 bg-amber-50 text-amber-800', href: '/dashboard/job-requests' },
              { text: `${pendingTs} timesheet${pendingTs !== 1 ? 's' : ''} awaiting review`, color: 'border-blue-400 bg-blue-50 text-blue-800', href: '/dashboard/timesheets' },
              { text: `${openApps} applications pending screening`, color: 'border-purple-400 bg-purple-50 text-purple-800', href: '/dashboard/applications' },
            ].map(a => (
              <Link key={a.text} href={a.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-l-4 text-sm ${a.color}`}>
                {a.text} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Dept hours bar chart */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Hours by Department (March 2024)</h3>
        <div className="flex items-end gap-3 h-28">
          {[['CS', 100], ['Physics', 72], ['Library', 60], ['Admin', 45], ['Biology', 38], ['Engineering', 55]].map(([dept, val]) => (
            <div key={dept} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-600">{val}h</span>
              <div className="w-full bg-blue-500 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${(Number(val) / 100) * 80}px` }} />
              <span className="text-xs text-gray-400">{dept}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

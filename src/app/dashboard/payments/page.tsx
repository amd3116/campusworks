'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { PAYMENTS } from '@/lib/data'
import { Badge, Toast, PageHeader } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import type { Payment } from '@/types'

export default function PaymentsPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const isStudent = user?.role === 'student'

  const [payments, setPayments] = useState<Payment[]>(
    isStudent ? PAYMENTS.filter(p => p.studentId === 'u3') : PAYMENTS
  )
  const [toast, setToast] = useState('')

  function process(id: string) {
    setPayments(ps => ps.map(p => p.id === id ? { ...p, status: 'paid', processedAt: new Date().toISOString().split('T')[0] } : p))
    setToast('Payment processed. Student & Finance notified.')
  }

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const totalPending = payments.filter(p => p.status !== 'paid').reduce((s, p) => s + p.amount, 0)

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Auto-calculated from job model & approved timesheet hours"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="stat-card"><div className="text-2xl font-semibold text-emerald-600">{formatCurrency(totalPaid)}</div><div className="text-xs text-gray-500 mt-1">Total Paid</div></div>
        <div className="stat-card"><div className="text-2xl font-semibold text-amber-600">{formatCurrency(totalPending)}</div><div className="text-xs text-gray-500 mt-1">Pending</div></div>
        <div className="stat-card"><div className="text-2xl font-semibold text-blue-600">{payments.filter(p=>p.status==='paid').length}</div><div className="text-xs text-gray-500 mt-1">Processed</div></div>
        <div className="stat-card"><div className="text-2xl font-semibold text-gray-700">{payments.filter(p=>p.status!=='paid').length}</div><div className="text-xs text-gray-500 mt-1">In Progress</div></div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">ID</th>
                {!isStudent && <th className="table-header">Student</th>}
                <th className="table-header">Period</th>
                <th className="table-header">Hours</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Status</th>
                {!isStudent && <th className="table-header">Processed</th>}
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-blue-600">{p.id}</td>
                  {!isStudent && <td className="table-cell font-medium">{p.studentName}</td>}
                  <td className="table-cell text-gray-600">{p.period}</td>
                  <td className="table-cell">{p.hours}h</td>
                  <td className="table-cell">
                    <span className="font-semibold text-gray-900">{formatCurrency(p.amount)}</span>
                  </td>
                  <td className="table-cell"><Badge status={p.status} /></td>
                  {!isStudent && <td className="table-cell text-gray-400">{p.processedAt || '—'}</td>}
                  <td className="table-cell">
                    {p.status === 'processing' && !isStudent ? (
                      <button className="btn-success" onClick={() => process(p.id)}>Process Now</button>
                    ) : (
                      <button className="btn-secondary text-xs py-1.5">View Slip</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breakdown */}
      {isStudent && (
        <div className="card mt-5">
          <h3 className="font-semibold mb-3">Payment Breakdown</h3>
          <div className="space-y-2 text-sm">
            {[['Pay Rate', '৳400 / hour'], ['Contract Type', 'Hourly'], ['Max Hours/Week', '12 hrs'], ['Payment Cycle', 'Monthly'], ['Bank Account', '**** **** 8821']].map(([l,v]) => (
              <div key={l} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-500">{l}</span><span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

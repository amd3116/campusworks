'use client'
import { PageHeader } from '@/components/ui'

const DEPT_DATA = [['CS',100],['Physics',72],['Library',60],['Admin',45],['Biology',38],['Engineering',55]]
const PIPELINE = [['Total Applications',23,100],['Shortlisted',12,52],['Interviewed',8,35],['Selected',5,22],['Onboarded',5,22]]
const MONTHLY = [['Jan','32'],['Feb','38'],['Mar','47'],['Apr','45'],['May','—'],['Jun','—']]

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics & Reports" subtitle="HR / Management dashboard for compliance and insights" />

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {[
          ['Active Students','47','↑ 8 this sem','text-blue-600'],
          ['Total Hours (Sem)','1,284h','Logged','text-gray-800'],
          ['Total Payments','৳1.8L','Disbursed','text-emerald-600'],
          ['Avg Performance','4.1/5','This semester','text-amber-600'],
          ['Compliance Rate','96%','Policy adherence','text-emerald-600'],
          ['Retention Rate','84%','Re-hired rate','text-gray-800'],
        ].map(([l,v,s,c])=>(
          <div key={l} className="stat-card">
            <div className="text-xs text-gray-500 font-medium">{l}</div>
            <div className={`text-xl font-semibold mt-1 ${c}`}>{v}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Hours by Dept */}
        <div className="card">
          <h3 className="font-semibold mb-4">Monthly Hours by Department</h3>
          <div className="flex items-end gap-2 h-36">
            {DEPT_DATA.map(([dept,val])=>(
              <div key={dept} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-600">{val}h</span>
                <div className="w-full bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity" style={{height:`${(Number(val)/100)*100}px`}} />
                <span className="text-xs text-gray-400">{dept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Pipeline */}
        <div className="card">
          <h3 className="font-semibold mb-4">Hiring Pipeline Conversion</h3>
          <div className="space-y-3">
            {PIPELINE.map(([l,n,p])=>(
              <div key={l}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{l}</span>
                  <span className="font-semibold text-gray-900">{n}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width:`${p}%`}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job model distribution */}
      <div className="card mb-5">
        <h3 className="font-semibold mb-4">Job Model Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['Teaching Assistant',18,'bg-blue-100 text-blue-700'],['Research Assistant',14,'bg-purple-100 text-purple-700'],['Student Associate',10,'bg-green-100 text-green-700'],['Paid Volunteer',5,'bg-amber-100 text-amber-700']].map(([l,n,c])=>(
            <div key={l} className="card-sm flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-800">{n}</div>
              <div>
                <span className={`badge ${c} text-xs`}>{l}</span>
                <div className="text-xs text-gray-400 mt-1">{Math.round(Number(n)/47*100)}% of workforce</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active students trend */}
      <div className="card mb-5">
        <h3 className="font-semibold mb-4">Active Students – 2024 Trend</h3>
        <div className="flex items-end gap-4 h-28">
          {MONTHLY.map(([month,count])=>(
            <div key={month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-600">{count}</span>
              <div className={`w-full rounded-t ${count === '—' ? 'bg-gray-100' : 'bg-emerald-400 opacity-80'}`}
                style={{height:count==='—' ? '8px' : `${(Number(count)/50)*90}px`}} />
              <span className="text-xs text-gray-400">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export buttons */}
      <div className="card">
        <h3 className="font-semibold mb-3">Export Reports</h3>
        <div className="flex flex-wrap gap-2">
          {['Monthly Hours Report','Payment Summary','Performance Report','Compliance Report','Talent Pool Export'].map(r=>(
            <button key={r} className="btn-secondary text-sm">⬇ {r}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Toast, PageHeader } from '@/components/ui'

export default function SettingsPage() {
  const [toast, setToast] = useState('')
  const [settings, setSettings] = useState({
    maxHours: 12, minCgpa: 3.0, payRate: 400, contractDuration: '1 Semester', autoPublish: true,
    emailOnJob: true, emailOnApp: true, emailOnShortlist: true, emailOnInterview: true,
    emailOnPayment: true, inAppAlerts: true, weeklyDigest: false,
  })

  function save() { setToast('Settings saved successfully.') }

  const toggle = (key: keyof typeof settings) =>
    setSettings(s => ({ ...s, [key]: !s[key] }))

  return (
    <div>
      <PageHeader title="System Settings" subtitle="Configure platform-wide rules and notification preferences" />

      <div className="grid md:grid-cols-2 gap-5">
        {/* System Rules */}
        <div className="card">
          <h3 className="font-semibold mb-4">Employment Rules</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Max Hours per Week</label>
              <div className="flex items-center gap-2">
                <input className="input" type="number" value={settings.maxHours} min={1} max={20}
                  onChange={e=>setSettings(s=>({...s,maxHours:+e.target.value}))} />
                <span className="text-sm text-gray-500">hrs/week</span>
              </div>
            </div>
            <div>
              <label className="label">Minimum CGPA Requirement</label>
              <input className="input" type="number" step="0.1" min="2.0" max="4.0" value={settings.minCgpa}
                onChange={e=>setSettings(s=>({...s,minCgpa:+e.target.value}))} />
            </div>
            <div>
              <label className="label">Default Hourly Pay Rate (৳)</label>
              <input className="input" type="number" value={settings.payRate}
                onChange={e=>setSettings(s=>({...s,payRate:+e.target.value}))} />
            </div>
            <div>
              <label className="label">Default Contract Duration</label>
              <select className="select" value={settings.contractDuration}
                onChange={e=>setSettings(s=>({...s,contractDuration:e.target.value}))}>
                {['1 Semester','2 Semesters','1 Year','Project-based'].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <div className="text-sm font-medium text-gray-800">Auto-publish circulars</div>
                <div className="text-xs text-gray-400">Publish job circulars immediately after approval</div>
              </div>
              <button onClick={() => toggle('autoPublish')}
                className={`w-10 h-6 rounded-full transition-colors ${settings.autoPublish ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform ${settings.autoPublish ? 'translate-x-4' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h3 className="font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'Email on job posted', key: 'emailOnJob' },
              { label: 'Email on new application', key: 'emailOnApp' },
              { label: 'Email on shortlist', key: 'emailOnShortlist' },
              { label: 'Email on interview scheduled', key: 'emailOnInterview' },
              { label: 'Email on payment processed', key: 'emailOnPayment' },
              { label: 'In-app notifications', key: 'inAppAlerts' },
              { label: 'Weekly digest email', key: 'weeklyDigest' },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{label}</span>
                <button onClick={() => toggle(key as any)}
                  className={`w-10 h-6 rounded-full transition-colors flex items-center ${(settings as any)[key] ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mx-1 transition-transform ${(settings as any)[key] ? 'translate-x-4' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Demo credentials */}
        <div className="card md:col-span-2">
          <h3 className="font-semibold mb-4">Demo Credentials</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100">
                <th className="table-header">Role</th>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Password</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['Administrator','Dr. Sarah Mitchell','admin@campus.edu','Admin@123','bg-blue-100 text-blue-700'],
                  ['HR Manager','Prof. James Carter','hr@campus.edu','Manager@123','bg-green-100 text-green-700'],
                  ['Student','Aisha Rahman','student@campus.edu','Student@123','bg-amber-100 text-amber-700'],
                ].map(([role,name,email,pass,c])=>(
                  <tr key={email} className="hover:bg-gray-50">
                    <td className="table-cell"><span className={`badge ${c}`}>{role}</span></td>
                    <td className="table-cell font-medium">{name}</td>
                    <td className="table-cell text-blue-600 font-mono text-xs">{email}</td>
                    <td className="table-cell font-mono text-xs bg-gray-50 rounded">{pass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button className="btn-primary px-8" onClick={save}>Save Settings</button>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

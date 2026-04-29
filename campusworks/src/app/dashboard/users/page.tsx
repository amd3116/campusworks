'use client'
import { useState } from 'react'
import { USERS } from '@/lib/data'
import { Badge, Modal, Toast, PageHeader } from '@/components/ui'
import type { User } from '@/types'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(USERS)
  const [showInvite, setShowInvite] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: 'student' as User['role'], department: 'Computer Science' })

  function invite() {
    const newUser: User = {
      id: `u${users.length + 1}`,
      ...form,
      initials: form.name.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase(),
      avatarColor: form.role === 'admin' ? 'bg-blue-100 text-blue-700' : form.role === 'manager' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700',
    }
    setUsers(us => [...us, newUser])
    setShowInvite(false)
    setToast(`Invitation sent to ${form.email}.`)
  }

  const roleColor: Record<string, string> = {
    admin: 'bg-blue-100 text-blue-700',
    manager: 'bg-green-100 text-green-700',
    student: 'bg-amber-100 text-amber-700',
  }
  const roleLabel: Record<string, string> = { admin: 'Administrator', manager: 'HR Manager', student: 'Student' }

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage platform access for all roles"
        action={<button className="btn-primary" onClick={() => setShowInvite(true)}>+ Invite User</button>}
      />

      <div className="grid grid-cols-3 gap-3 mb-5">
        {['admin','manager','student'].map(role => (
          <div key={role} className="stat-card">
            <div className="text-2xl font-semibold text-gray-900">{users.filter(u=>u.role===role).length}</div>
            <div className="text-xs text-gray-500 mt-1">{roleLabel[role]}s</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="table-header">User</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Department</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${u.avatarColor}`}>{u.initials}</div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="table-cell text-gray-500">{u.email}</td>
                  <td className="table-cell"><span className={`badge ${roleColor[u.role]}`}>{roleLabel[u.role]}</span></td>
                  <td className="table-cell text-gray-500">{u.department || '—'}</td>
                  <td className="table-cell">
                    <div className="flex gap-1.5">
                      <button className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                      <button className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 text-xs py-1.5 px-3 rounded-md transition-colors"
                        onClick={() => setToast(`${u.name}'s account disabled.`)}>Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showInvite} title="Invite New User" onClose={() => setShowInvite(false)}
        footer={<><button className="btn-secondary" onClick={() => setShowInvite(false)}>Cancel</button><button className="btn-primary" onClick={invite}>Send Invitation</button></>}>
        <div className="space-y-3">
          <div><label className="label">Full Name</label><input className="input" placeholder="Dr. John Smith" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div><label className="label">Email Address</label><input className="input" type="email" placeholder="john@campus.edu" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Role</label>
              <select className="select" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value as any}))}>
                <option value="admin">Administrator</option>
                <option value="manager">HR Manager</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div>
              <label className="label">Department</label>
              <select className="select" value={form.department} onChange={e=>setForm(f=>({...f,department:e.target.value}))}>
                {['Computer Science','Physics','Library','Biology','Human Resources','Admin Office'].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  )
}

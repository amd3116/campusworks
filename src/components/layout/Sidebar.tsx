'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import type { User } from '@/types'

const ADMIN_NAV = [
  { section: 'Main', items: [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '🗃️', label: 'Job Requests', href: '/dashboard/job-requests' },
    { icon: '📢', label: 'Job Circulars', href: '/dashboard/circulars' },
    { icon: '👥', label: 'Applications', href: '/dashboard/applications' },
  ]},
  { section: 'Operations', items: [
    { icon: '📅', label: 'Schedules', href: '/dashboard/schedules' },
    { icon: '⏱️', label: 'Timesheets', href: '/dashboard/timesheets' },
    { icon: '💰', label: 'Payments', href: '/dashboard/payments' },
    { icon: '⭐', label: 'Performance', href: '/dashboard/performance' },
    { icon: '📄', label: 'Documents', href: '/dashboard/documents' },
  ]},
  { section: 'System', items: [
    { icon: '👤', label: 'Users', href: '/dashboard/users' },
    { icon: '📈', label: 'Analytics', href: '/dashboard/analytics' },
    { icon: '🎓', label: 'Talent Pool', href: '/dashboard/talent' },
    { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
  ]},
]

const MANAGER_NAV = [
  { section: 'Main', items: [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '🗃️', label: 'Job Requests', href: '/dashboard/job-requests' },
    { icon: '📢', label: 'Job Circulars', href: '/dashboard/circulars' },
    { icon: '👥', label: 'Applications', href: '/dashboard/applications' },
  ]},
  { section: 'Operations', items: [
    { icon: '📅', label: 'Schedules', href: '/dashboard/schedules' },
    { icon: '⏱️', label: 'Timesheets', href: '/dashboard/timesheets' },
    { icon: '💰', label: 'Payments', href: '/dashboard/payments' },
    { icon: '⭐', label: 'Performance', href: '/dashboard/performance' },
    { icon: '📄', label: 'Documents', href: '/dashboard/documents' },
  ]},
  { section: 'Reports', items: [
    { icon: '📈', label: 'Analytics', href: '/dashboard/analytics' },
    { icon: '🎓', label: 'Talent Pool', href: '/dashboard/talent' },
  ]},
]

const STUDENT_NAV = [
  { section: 'Main', items: [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '💼', label: 'Find Jobs', href: '/dashboard/circulars' },
    { icon: '📝', label: 'My Applications', href: '/dashboard/applications' },
  ]},
  { section: 'Work', items: [
    { icon: '📅', label: 'My Schedule', href: '/dashboard/schedules' },
    { icon: '⏱️', label: 'Timesheets', href: '/dashboard/timesheets' },
    { icon: '💰', label: 'Payments', href: '/dashboard/payments' },
  ]},
  { section: 'Profile', items: [
    { icon: '⭐', label: 'Performance', href: '/dashboard/performance' },
    { icon: '📄', label: 'Documents', href: '/dashboard/documents' },
  ]},
]

export function Sidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const nav = user.role === 'admin' ? ADMIN_NAV : user.role === 'manager' ? MANAGER_NAV : STUDENT_NAV

  return (
    <div className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-sm">🎓</div>
          <span className="font-semibold text-gray-900">Campus<span className="text-blue-600">Works</span></span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {user.role === 'admin' ? 'Administrator' : user.role === 'manager' ? 'HR Manager' : 'Student Portal'}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {nav.map(section => (
          <div key={section.section} className="mb-3">
            <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">{section.section}</div>
            {section.items.map(item => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}
                  className={`nav-item mb-0.5 ${isActive ? 'nav-item-active' : ''}`}>
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2 px-2 mb-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${user.avatarColor}`}>
            {user.initials}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-gray-800 truncate">{user.name?.split(' ').slice(0,2).join(' ')}</div>
            <div className="text-xs text-gray-400 truncate">{user.email}</div>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-2 py-1.5 rounded-lg text-left transition-colors">
          Sign out
        </button>
      </div>
    </div>
  )
}

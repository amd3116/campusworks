'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NOTIFICATIONS } from '@/lib/data'
import { timeAgo } from '@/lib/utils'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/job-requests': 'Job Requests',
  '/dashboard/circulars': 'Job Circulars',
  '/dashboard/applications': 'Applications',
  '/dashboard/schedules': 'Work Schedules',
  '/dashboard/timesheets': 'Timesheets',
  '/dashboard/payments': 'Payments',
  '/dashboard/performance': 'Performance Reviews',
  '/dashboard/documents': 'Documents',
  '/dashboard/users': 'User Management',
  '/dashboard/analytics': 'Analytics & Reports',
  '/dashboard/talent': 'Talent Pool',
  '/dashboard/settings': 'Settings',
}

export function Topbar({ user }: { user: any }) {
  const pathname = usePathname()
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const unread = notifications.filter(n => !n.isRead).length

  function markAllRead() {
    setNotifications(n => n.map(x => ({ ...x, isRead: true })))
  }

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0 relative z-10">
      <h1 className="text-base font-semibold text-gray-900">{PAGE_TITLES[pathname] || 'Dashboard'}</h1>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <div className="relative">
          <button onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">{unread}</span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-sm">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!n.isRead ? 'border-l-2 border-blue-500' : ''}`}
                    onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, isRead: true } : x))}>
                    <div className="text-sm text-gray-800">{n.body}</div>
                    <div className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setNotifOpen(false)}
                className="w-full py-2.5 text-xs text-gray-500 hover:bg-gray-50 text-center border-t border-gray-100">
                Close
              </button>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${user.avatarColor}`}>
            {user.initials}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-gray-800">{user.name?.split(' ').slice(0,2).join(' ')}</div>
            <div className="text-xs text-gray-400 capitalize">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
import { ManagerDashboard } from '@/components/dashboard/ManagerDashboard'
import { StudentDashboard } from '@/components/dashboard/StudentDashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user as any
  if (user?.role === 'admin') return <AdminDashboard user={user} />
  if (user?.role === 'manager') return <ManagerDashboard user={user} />
  return <StudentDashboard user={user} />
}

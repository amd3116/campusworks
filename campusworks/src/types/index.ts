export type Role = 'admin' | 'manager' | 'student'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  department?: string
  initials: string
  avatarColor: string
  studentId?: string
  semester?: number
  cgpa?: number
  skills?: string[]
}

export interface JobRequest {
  id: string
  department: string
  role: string
  jobModel: 'Teaching Assistant' | 'Research Assistant' | 'Student Associate' | 'Paid Volunteer'
  hoursPerWeek: number
  budget: number
  description: string
  status: 'pending' | 'approved' | 'rejected'
  submittedBy: string
  date: string
}

export interface JobCircular {
  id: string
  jobRequestId: string
  title: string
  department: string
  description: string
  slotsAvailable: number
  minCgpa: number
  deadline: string
  status: 'open' | 'closed'
  applicants: number
  publishedAt: string
  hoursPerWeek: number
  payRate: number
}

export interface Application {
  id: string
  circularId: string
  circularTitle: string
  studentId: string
  studentName: string
  cgpa: number
  department: string
  skills: string[]
  coverNote: string
  status: 'applied' | 'shortlisted' | 'interview' | 'selected' | 'rejected' | 'accepted'
  appliedAt: string
  interviewDate?: string
}

export interface Contract {
  id: string
  applicationId: string
  studentId: string
  studentName: string
  supervisorId: string
  position: string
  department: string
  jobModel: string
  paymentType: 'hourly' | 'project'
  hourlyRate: number
  hoursPerWeek: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'terminated'
  signedAt?: string
}

export interface Timesheet {
  id: string
  contractId: string
  studentId: string
  studentName: string
  weekStart: string
  weekEnd: string
  hours: number
  summary: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewNote?: string
}

export interface Payment {
  id: string
  studentId: string
  studentName: string
  contractId: string
  period: string
  amount: number
  hours: number
  status: 'pending' | 'processing' | 'paid'
  processedAt?: string
}

export interface PerformanceReview {
  id: string
  studentId: string
  studentName: string
  supervisorId: string
  period: string
  overallScore: number
  taskScore: number
  punctualityScore: number
  communicationScore: number
  qualityScore: number
  initiativeScore: number
  comments: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  body: string
  isRead: boolean
  createdAt: string
}

export interface Schedule {
  id: string
  studentId: string
  studentName: string
  day: string
  startTime: string
  endTime: string
  task: string
  location: string
  confirmed: boolean
}

export interface Document {
  id: string
  name: string
  type: 'Contract' | 'Approval' | 'Supporting' | 'ID'
  relatedTo: string
  uploadedBy: string
  date: string
  status: 'active' | 'pending' | 'expired'
  url?: string
}

export interface TalentProfile {
  userId: string
  name: string
  department: string
  cgpa: number
  skills: string[]
  workHistory: string
  aiScore: number
  available: boolean
  totalHours: number
  avgPerformance: number
}

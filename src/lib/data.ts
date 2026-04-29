import type { User, JobRequest, JobCircular, Application, Contract, Timesheet, Payment, PerformanceReview, Notification, Schedule, Document, TalentProfile } from '@/types'

export const USERS: User[] = [
  {
    id: 'u1',
    email: 'admin@campus.edu',
    name: 'Dr. Sarah Mitchell',
    role: 'admin',
    department: 'System Administration',
    initials: 'SM',
    avatarColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'u2',
    email: 'hr@campus.edu',
    name: 'Prof. James Carter',
    role: 'manager',
    department: 'Human Resources',
    initials: 'JC',
    avatarColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'u3',
    email: 'student@campus.edu',
    name: 'Aisha Rahman',
    role: 'student',
    department: 'Computer Science',
    initials: 'AR',
    avatarColor: 'bg-amber-100 text-amber-700',
    studentId: 'STU-2021-0847',
    semester: 8,
    cgpa: 3.8,
    skills: ['Python', 'Data Analysis', 'Teaching', 'Java'],
  },
]

export const CREDENTIALS: Record<string, string> = {
  'admin@campus.edu': 'Admin@123',
  'hr@campus.edu': 'Manager@123',
  'student@campus.edu': 'Student@123',
}

export const JOB_REQUESTS: JobRequest[] = [
  { id: 'JR-001', department: 'Computer Science', role: 'Teaching Assistant', jobModel: 'Teaching Assistant', hoursPerWeek: 12, budget: 80000, description: 'Assist faculty in CS101 tutorials and lab sessions.', status: 'approved', submittedBy: 'u2', date: '2024-03-01' },
  { id: 'JR-002', department: 'Library', role: 'Research Assistant', jobModel: 'Research Assistant', hoursPerWeek: 10, budget: 60000, description: 'Help with cataloging and student research support.', status: 'pending', submittedBy: 'u2', date: '2024-03-05' },
  { id: 'JR-003', department: 'Physics', role: 'Lab Assistant', jobModel: 'Research Assistant', hoursPerWeek: 8, budget: 50000, description: 'Assist in physics lab experiments and equipment maintenance.', status: 'approved', submittedBy: 'u2', date: '2024-03-08' },
  { id: 'JR-004', department: 'Admin Office', role: 'Student Associate', jobModel: 'Student Associate', hoursPerWeek: 15, budget: 90000, description: 'Administrative support for the registrar office.', status: 'rejected', submittedBy: 'u2', date: '2024-03-10' },
]

export const JOB_CIRCULARS: JobCircular[] = [
  { id: 'JC-001', jobRequestId: 'JR-001', title: 'Teaching Assistant – CS101', department: 'Computer Science', description: 'Join the CS department as a Teaching Assistant for CS101 (Introduction to Programming). You will conduct tutorial sessions, grade assignments, and provide office hours for students.', slotsAvailable: 3, minCgpa: 3.5, deadline: '2024-04-01', status: 'open', applicants: 12, publishedAt: '2024-03-02', hoursPerWeek: 12, payRate: 400 },
  { id: 'JC-002', jobRequestId: 'JR-003', title: 'Research Assistant – Physics Lab', department: 'Physics', description: 'Work alongside faculty researchers in the advanced physics lab. Responsibilities include data collection, experiment setup, and report writing.', slotsAvailable: 2, minCgpa: 3.0, deadline: '2024-04-10', status: 'open', applicants: 7, publishedAt: '2024-03-09', hoursPerWeek: 8, payRate: 350 },
  { id: 'JC-003', jobRequestId: 'JR-002', title: 'Library Student Associate', department: 'Library', description: 'Assist library staff with cataloging, student inquiries, and digital resource management.', slotsAvailable: 1, minCgpa: 3.0, deadline: '2024-03-25', status: 'closed', applicants: 4, publishedAt: '2024-03-06', hoursPerWeek: 10, payRate: 300 },
]

export const APPLICATIONS: Application[] = [
  { id: 'APP-001', circularId: 'JC-001', circularTitle: 'Teaching Assistant – CS101', studentId: 'u3', studentName: 'Aisha Rahman', cgpa: 3.8, department: 'Computer Science', skills: ['Python', 'Teaching', 'Data Analysis'], coverNote: 'I have strong programming skills and enjoy teaching peers.', status: 'shortlisted', appliedAt: '2024-03-15', interviewDate: '2024-04-02' },
  { id: 'APP-002', circularId: 'JC-002', circularTitle: 'Research Assistant – Physics Lab', studentId: 'u4', studentName: 'Rafiq Islam', cgpa: 3.5, department: 'Physics', skills: ['Research', 'Lab Work', 'MATLAB'], coverNote: 'Passionate about physics research and lab experiments.', status: 'applied', appliedAt: '2024-03-16' },
  { id: 'APP-003', circularId: 'JC-001', circularTitle: 'Teaching Assistant – CS101', studentId: 'u5', studentName: 'Nadia Chowdhury', cgpa: 3.9, department: 'Computer Science', skills: ['Java', 'Teaching', 'Algorithms'], coverNote: 'Top student eager to contribute to teaching.', status: 'selected', appliedAt: '2024-03-14' },
  { id: 'APP-004', circularId: 'JC-003', circularTitle: 'Library Student Associate', studentId: 'u6', studentName: 'Hasan Ali', cgpa: 3.2, department: 'Library Science', skills: ['Cataloging', 'Customer Service'], coverNote: 'Interested in library management systems.', status: 'rejected', appliedAt: '2024-03-13' },
]

export const CONTRACTS: Contract[] = [
  { id: 'CON-001', applicationId: 'APP-001', studentId: 'u3', studentName: 'Aisha Rahman', supervisorId: 'u2', position: 'Teaching Assistant', department: 'Computer Science', jobModel: 'Teaching Assistant', paymentType: 'hourly', hourlyRate: 400, hoursPerWeek: 12, startDate: '2024-01-15', endDate: '2024-06-30', status: 'active', signedAt: '2024-01-15' },
  { id: 'CON-002', applicationId: 'APP-003', studentId: 'u5', studentName: 'Nadia Chowdhury', supervisorId: 'u2', position: 'Teaching Assistant', department: 'Computer Science', jobModel: 'Teaching Assistant', paymentType: 'hourly', hourlyRate: 400, hoursPerWeek: 10, startDate: '2024-01-15', endDate: '2024-06-30', status: 'active', signedAt: '2024-01-16' },
]

export const TIMESHEETS: Timesheet[] = [
  { id: 'TS-001', contractId: 'CON-001', studentId: 'u3', studentName: 'Aisha Rahman', weekStart: '2024-03-11', weekEnd: '2024-03-17', hours: 11, summary: 'Conducted 2 tutorial sessions, graded 45 assignments, held office hours.', status: 'approved', submittedAt: '2024-03-17', reviewedAt: '2024-03-18' },
  { id: 'TS-002', contractId: 'CON-002', studentId: 'u5', studentName: 'Nadia Chowdhury', weekStart: '2024-03-11', weekEnd: '2024-03-17', hours: 10, summary: 'Lab supervision, grading quizzes, prepared tutorial slides.', status: 'pending', submittedAt: '2024-03-18' },
  { id: 'TS-003', contractId: 'CON-001', studentId: 'u3', studentName: 'Aisha Rahman', weekStart: '2024-03-04', weekEnd: '2024-03-10', hours: 12, summary: 'Full week: tutorials, midterm grading, consultation sessions.', status: 'approved', submittedAt: '2024-03-10', reviewedAt: '2024-03-11' },
]

export const PAYMENTS: Payment[] = [
  { id: 'PAY-001', studentId: 'u3', studentName: 'Aisha Rahman', contractId: 'CON-001', period: 'February 2024', amount: 17600, hours: 44, status: 'paid', processedAt: '2024-03-05' },
  { id: 'PAY-002', studentId: 'u5', studentName: 'Nadia Chowdhury', contractId: 'CON-002', period: 'February 2024', amount: 16000, hours: 40, status: 'paid', processedAt: '2024-03-05' },
  { id: 'PAY-003', studentId: 'u3', studentName: 'Aisha Rahman', contractId: 'CON-001', period: 'March 2024', amount: 9200, hours: 23, status: 'processing', },
]

export const PERFORMANCE_REVIEWS: PerformanceReview[] = [
  { id: 'PR-001', studentId: 'u3', studentName: 'Aisha Rahman', supervisorId: 'u2', period: 'March 2024', overallScore: 4.2, taskScore: 4.3, punctualityScore: 4.5, communicationScore: 4.1, qualityScore: 4.2, initiativeScore: 3.9, comments: 'Excellent communicator. Strong understanding of subject matter. Students rate her very highly. Recommend for renewal.', createdAt: '2024-03-28' },
  { id: 'PR-002', studentId: 'u5', studentName: 'Nadia Chowdhury', supervisorId: 'u2', period: 'March 2024', overallScore: 4.5, taskScore: 4.6, punctualityScore: 4.8, communicationScore: 4.4, qualityScore: 4.5, initiativeScore: 4.2, comments: 'Outstanding performance this semester. Students gave consistently positive feedback. A model TA.', createdAt: '2024-03-28' },
]

export const NOTIFICATIONS: Notification[] = [
  { id: 'N-001', userId: 'u1', type: 'job_request', title: 'New Job Request', body: 'CS Department submitted a new job request for Teaching Assistant (12 hrs/week).', isRead: false, createdAt: '2024-03-20T09:00:00Z' },
  { id: 'N-002', userId: 'u1', type: 'timesheet', title: 'Timesheet Submitted', body: 'Aisha Rahman submitted timesheet for week Mar 11–17 (11 hrs).', isRead: false, createdAt: '2024-03-18T14:30:00Z' },
  { id: 'N-003', userId: 'u1', type: 'application', title: 'New Application', body: 'Rafiq Islam applied for Research Assistant – Physics Lab.', isRead: false, createdAt: '2024-03-16T10:00:00Z' },
  { id: 'N-004', userId: 'u1', type: 'payment', title: 'Payment Processed', body: 'February batch payments processed. Total: ৳33,600 for 2 students.', isRead: false, createdAt: '2024-03-05T09:00:00Z' },
  { id: 'N-005', userId: 'u1', type: 'contract', title: 'Contract Renewal Due', body: '2 contracts expire in June 2024. Review for renewal.', isRead: true, createdAt: '2024-03-01T09:00:00Z' },
]

export const SCHEDULES: Schedule[] = [
  { id: 'SCH-001', studentId: 'u3', studentName: 'Aisha Rahman', day: 'Monday', startTime: '09:00', endTime: '11:00', task: 'Tutorial Lab – CS101', location: 'CS Building, Room 210', confirmed: true },
  { id: 'SCH-002', studentId: 'u3', studentName: 'Aisha Rahman', day: 'Wednesday', startTime: '14:00', endTime: '16:00', task: 'Office Hours', location: 'Faculty Room 3', confirmed: true },
  { id: 'SCH-003', studentId: 'u3', studentName: 'Aisha Rahman', day: 'Friday', startTime: '10:00', endTime: '12:00', task: 'Assignment Grading', location: 'Online (Portal)', confirmed: true },
  { id: 'SCH-004', studentId: 'u5', studentName: 'Nadia Chowdhury', day: 'Tuesday', startTime: '09:00', endTime: '11:00', task: 'Tutorial – Algorithms', location: 'CS Building, Room 105', confirmed: true },
  { id: 'SCH-005', studentId: 'u5', studentName: 'Nadia Chowdhury', day: 'Thursday', startTime: '13:00', endTime: '15:00', task: 'Lab Supervision', location: 'CS Lab, Room 301', confirmed: true },
]

export const DOCUMENTS: Document[] = [
  { id: 'DOC-001', name: 'Employment Contract – Aisha Rahman', type: 'Contract', relatedTo: 'Aisha Rahman', uploadedBy: 'HR Department', date: '2024-01-15', status: 'active' },
  { id: 'DOC-002', name: 'Employment Contract – Nadia Chowdhury', type: 'Contract', relatedTo: 'Nadia Chowdhury', uploadedBy: 'HR Department', date: '2024-01-16', status: 'active' },
  { id: 'DOC-003', name: 'Job Approval – CS Department (JR-001)', type: 'Approval', relatedTo: 'CS Department', uploadedBy: 'Admin', date: '2024-01-10', status: 'active' },
  { id: 'DOC-004', name: 'ID Verification – Aisha Rahman', type: 'ID', relatedTo: 'Aisha Rahman', uploadedBy: 'Student', date: '2024-01-14', status: 'active' },
  { id: 'DOC-005', name: 'Contract Renewal Notice – Rafiq Islam', type: 'Contract', relatedTo: 'Rafiq Islam', uploadedBy: 'HR Department', date: '2024-03-01', status: 'pending' },
]

export const TALENT_POOL: TalentProfile[] = [
  { userId: 'u3', name: 'Aisha Rahman', department: 'Computer Science', cgpa: 3.8, skills: ['Python', 'Teaching', 'Data Analysis', 'Java'], workHistory: '2 semesters as TA', aiScore: 95, available: false, totalHours: 240, avgPerformance: 4.2 },
  { userId: 'u4', name: 'Rafiq Islam', department: 'Physics', cgpa: 3.5, skills: ['Research', 'Lab Work', 'MATLAB', 'Report Writing'], workHistory: '1 semester as RA', aiScore: 82, available: true, totalHours: 120, avgPerformance: 3.9 },
  { userId: 'u5', name: 'Nadia Chowdhury', department: 'Computer Science', cgpa: 3.9, skills: ['Java', 'Teaching', 'Algorithms', 'DSA'], workHistory: '2 semesters as TA', aiScore: 97, available: false, totalHours: 200, avgPerformance: 4.5 },
  { userId: 'u6', name: 'Hasan Ali', department: 'Library Science', cgpa: 3.2, skills: ['Cataloging', 'Customer Service', 'Digital Archives'], workHistory: 'New applicant', aiScore: 71, available: true, totalHours: 0, avgPerformance: 0 },
  { userId: 'u7', name: 'Fatima Begum', department: 'Biology', cgpa: 3.7, skills: ['Lab Techniques', 'Research', 'Report Writing'], workHistory: '1 semester as Research Vol.', aiScore: 88, available: true, totalHours: 80, avgPerformance: 4.1 },
]

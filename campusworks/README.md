# 🎓 CampusWorks – On-Campus Student Employment Management System

A complete, production-ready web application for managing on-campus student employment — built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **NextAuth.js**.

---

## 🚀 Deploy to Vercel (1-click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/campusworks)

**Required Vercel Environment Variable:**
```
NEXTAUTH_SECRET = any-random-string-at-least-32-chars
```
> Generate one: `openssl rand -base64 32`

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@campus.edu | Admin@123 |
| **HR Manager** | hr@campus.edu | Manager@123 |
| **Student** | student@campus.edu | Student@123 |

---

## 🏗️ Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — change NEXTAUTH_SECRET to any random string

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

### Production build
```bash
npm run build
npm run start
```

---

## 📦 Vercel Deployment Steps

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variable:
   - `NEXTAUTH_SECRET` = `your-random-secret-here`
4. Click **Deploy** — done!

> No database required. The app uses in-memory data (perfect for demo/prototype). To connect a real database, see the **Database** section below.

---

## 🗂️ Folder Structure

```
campusworks/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── api/auth/[...nextauth]/   # NextAuth API route
│   │   ├── login/                    # Login page
│   │   ├── dashboard/                # Protected dashboard pages
│   │   │   ├── page.tsx              # Dashboard home (role-based)
│   │   │   ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│   │   │   ├── job-requests/         # Job request management
│   │   │   ├── circulars/            # Job circulars / postings
│   │   │   ├── applications/         # Application screening workflow
│   │   │   ├── schedules/            # Work schedule management
│   │   │   ├── timesheets/           # Timesheet submission & approval
│   │   │   ├── payments/             # Payment management
│   │   │   ├── performance/          # Performance reviews
│   │   │   ├── documents/            # Document repository
│   │   │   ├── users/                # User management (admin only)
│   │   │   ├── analytics/            # Analytics & reports
│   │   │   ├── talent/               # Talent pool with AI scoring
│   │   │   └── settings/             # System settings
│   │   ├── globals.css               # Tailwind + custom CSS
│   │   ├── layout.tsx                # Root layout
│   │   └── providers.tsx             # NextAuth SessionProvider
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx           # Role-based navigation sidebar
│   │   │   └── Topbar.tsx            # Top bar with notifications
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.tsx    # Admin dashboard view
│   │   │   └── ManagerDashboard.tsx  # Manager + Student dashboard views
│   │   └── ui/
│   │       └── index.tsx             # Shared UI components (Badge, Modal, Toast, etc.)
│   ├── lib/
│   │   ├── data.ts                   # Seed data (in-memory database)
│   │   ├── auth.ts                   # Auth utilities
│   │   └── utils.ts                  # Helper functions
│   └── types/
│       └── index.ts                  # TypeScript types
├── .env.example                      # Environment variable template
├── .env.local                        # Local environment (do not commit)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ✨ Features by Role

### 👤 Admin
- Full dashboard with KPIs (active students, payments, hours, compliance)
- Job request management with approve/reject workflow
- Job circular publication
- Application screening (shortlist → interview → select)
- Schedule conflict detection
- Timesheet review & approval
- Payment processing
- Performance reviews
- Document repository
- User management (invite, disable)
- Analytics & reports
- AI-scored Talent Pool
- System settings

### 👔 HR Manager
- Same as Admin minus user management and system settings
- Team overview dashboard
- All operational modules

### 🎓 Student
- Personal dashboard with schedule, payments, and performance
- Browse and apply to open job circulars (1-click with auto-filled profile)
- Track application status
- Submit timesheets (max 12 hrs/week enforced)
- View payment history and slips
- View performance feedback
- Access personal documents

---

## 🔔 Notification System

All actions trigger in-app notifications visible in the topbar bell icon:
- New job request submitted
- Application received / status changed
- Interview scheduled
- Timesheet submitted / reviewed
- Payment processed

---

## 🤖 AI Talent Scoring

Each student gets an AI score (0–100) based on:
- **CGPA** — 30% weight
- **Work Experience** — 25% weight (semesters worked)
- **Performance History** — 25% weight (avg rating)
- **Skill Breadth** — 20% weight (number of skills)

---

## 🗄️ Adding a Real Database (Optional)

The app currently uses in-memory demo data. To connect PostgreSQL:

1. Install Prisma:
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. Add `DATABASE_URL` to `.env.local`:
   ```
   DATABASE_URL=postgresql://user:pass@localhost:5432/campusworks
   ```

3. Use the schema from the README or generate from `src/types/index.ts`

4. Replace imports in pages from `@/lib/data` with Prisma client calls

**Recommended free databases for Vercel:**
- [Neon](https://neon.tech) — free serverless PostgreSQL
- [PlanetScale](https://planetscale.com) — free MySQL
- [Supabase](https://supabase.com) — free PostgreSQL + auth

---

## 🗃️ Database Schema (Reference)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,  -- 'admin' | 'manager' | 'student'
  department VARCHAR(255),
  student_id VARCHAR(50),
  semester INT,
  cgpa DECIMAL(3,2),
  skills TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Job Requests
CREATE TABLE job_requests (
  id VARCHAR(20) PRIMARY KEY,
  department VARCHAR(255),
  role VARCHAR(255),
  job_model VARCHAR(100),
  hours_per_week INT CHECK (hours_per_week <= 12),
  budget DECIMAL(10,2),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_by UUID REFERENCES users(id),
  date DATE DEFAULT CURRENT_DATE
);

-- Job Circulars
CREATE TABLE job_circulars (
  id VARCHAR(20) PRIMARY KEY,
  job_request_id VARCHAR(20) REFERENCES job_requests(id),
  title VARCHAR(255),
  department VARCHAR(255),
  description TEXT,
  slots_available INT,
  min_cgpa DECIMAL(3,2) DEFAULT 3.0,
  deadline DATE,
  status VARCHAR(20) DEFAULT 'open',
  applicants INT DEFAULT 0,
  published_at TIMESTAMP,
  hours_per_week INT,
  pay_rate DECIMAL(8,2)
);

-- Applications
CREATE TABLE applications (
  id VARCHAR(20) PRIMARY KEY,
  circular_id VARCHAR(20) REFERENCES job_circulars(id),
  student_id UUID REFERENCES users(id),
  cgpa DECIMAL(3,2),
  skills TEXT[],
  cover_note TEXT,
  status VARCHAR(20) DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT NOW(),
  interview_date DATE
);

-- Timesheets
CREATE TABLE timesheets (
  id VARCHAR(20) PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  week_start DATE,
  week_end DATE,
  hours DECIMAL(4,1) CHECK (hours <= 12),
  summary TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  review_note TEXT
);

-- Payments
CREATE TABLE payments (
  id VARCHAR(20) PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  period VARCHAR(50),
  amount DECIMAL(10,2),
  hours DECIMAL(6,1),
  status VARCHAR(20) DEFAULT 'pending',
  processed_at TIMESTAMP
);

-- Performance Reviews
CREATE TABLE performance_reviews (
  id VARCHAR(20) PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  supervisor_id UUID REFERENCES users(id),
  period VARCHAR(50),
  overall_score DECIMAL(2,1),
  task_score DECIMAL(2,1),
  punctuality_score DECIMAL(2,1),
  communication_score DECIMAL(2,1),
  quality_score DECIMAL(2,1),
  initiative_score DECIMAL(2,1),
  comments TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📡 API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signin` | NextAuth sign in |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/signout` | Sign out |

> All other data operations are done client-side with in-memory state. Add API routes under `src/app/api/` when connecting a real database.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v4 |
| State | React useState (client-side) |
| Fonts | Inter (Google Fonts) |
| Icons | Lucide React + Emoji |
| Deployment | Vercel |

---

## 📋 Process Flow Coverage

✅ Job Requirement → ✅ Approval → ✅ Job Circular → ✅ Student Login →
✅ Profile Auto-Fill → ✅ Application → ✅ Screening → ✅ Interview →
✅ Selection → ✅ Onboarding → ✅ Work Schedule → ✅ Work Execution →
✅ Time Tracking → ✅ Payment Management → ✅ Performance Review →
✅ Continuation/Exit → ✅ Backup/Contingency → ✅ Document Management →
✅ Notifications → ✅ Analytics → ✅ Talent Pool

All 21 process steps from the original specification are implemented.

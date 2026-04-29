import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { validateCredentials } from './auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = validateCredentials(credentials.email, credentials.password)
        if (!user) return null
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
          initials: user.initials,
          avatarColor: user.avatarColor,
          studentId: user.studentId,
          semester: user.semester,
          cgpa: user.cgpa,
          skills: user.skills,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as Record<string, unknown>
        token.role = u.role
        token.department = u.department
        token.initials = u.initials
        token.avatarColor = u.avatarColor
        token.studentId = u.studentId
        token.semester = u.semester
        token.cgpa = u.cgpa
        token.skills = u.skills
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        const u = session.user as Record<string, unknown>
        u.id = token.sub
        u.role = token.role
        u.department = token.department
        u.initials = token.initials
        u.avatarColor = token.avatarColor
        u.studentId = token.studentId
        u.semester = token.semester
        u.cgpa = token.cgpa
        u.skills = token.skills
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}

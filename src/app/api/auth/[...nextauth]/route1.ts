import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { validateCredentials } from '@/lib/auth'

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
        } as any
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.department = (user as any).department
        token.initials = (user as any).initials
        token.avatarColor = (user as any).avatarColor
        token.studentId = (user as any).studentId
        token.semester = (user as any).semester
        token.cgpa = (user as any).cgpa
        token.skills = (user as any).skills
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub
        ;(session.user as any).role = token.role
        ;(session.user as any).department = token.department
        ;(session.user as any).initials = token.initials
        ;(session.user as any).avatarColor = token.avatarColor
        ;(session.user as any).studentId = token.studentId
        ;(session.user as any).semester = token.semester
        ;(session.user as any).cgpa = token.cgpa
        ;(session.user as any).skills = token.skills
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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

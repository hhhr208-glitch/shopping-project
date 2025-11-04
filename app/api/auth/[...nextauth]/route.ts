import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { Adapter } from "next-auth/adapters"
import type { NextAuthOptions } from "next-auth"

const prisma = new PrismaClient()

// REMOVE THE EXPORT - just define it
const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
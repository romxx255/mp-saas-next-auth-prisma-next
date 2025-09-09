import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredencials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);

        // lógica de autenticação
        const user = await findUserByCredencials(credentials?.email as string, credentials?.password as string);

        // se não autenticado, retorna null
        if (!user) return null;

        // se autenticado, retorna user
        return user;
      },
    }),
  ],
  trustHost: true, // Trust the host when deployed on a platform like Vercel
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || '';
      }
      return session;
    },
  },
});

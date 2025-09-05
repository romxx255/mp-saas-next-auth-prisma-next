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

        // se autenticado, retorna user

        return user;
      },
    }),
  ],
});

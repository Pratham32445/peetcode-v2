import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "@/db/index"

export const authOptions: AuthOptions = {
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ account, profile }): Promise<any> {
      if (account?.provider == "google") {
        if (!profile) return;
        let user = await client.user.findFirst({
          where: { email: profile?.email },
        });
        if (user) return user;
        user = await client.user.create({ data: { email: profile.email! } });
        return user;
      }
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text", placeholder: "Enter email" },
        password: { type: "text" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        if (!credentials) return;
        const { email, password } = credentials;
        const isUser = await client.user.findFirst({ where: { email } });
        console.log(isUser);
        if (isUser) return isUser;
        const user = await client.user.create({
          data: { email, password },
        });
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

import NextAuth, { type SessionStrategy, User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare, hash } from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const client = await clientPromise;
        const users = client.db("lifeline").collection("users");
        const user = await users.findOne({ email });

        if (!user) {
          // Instead of revealing user doesn't exist (security best practice)
          throw new Error("Invalid email or password");
        }

        // For users who registered with credentials
        if (user.password) {
          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }
        } else {
          // User registered with OAuth, no password to compare
          throw new Error("Please sign in with the method you used to create your account");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: User; account?: Account | null }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
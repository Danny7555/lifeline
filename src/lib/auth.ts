import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import { type SessionStrategy, User, Account, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  // Fix: Specify the database name explicitly to avoid case issues
  adapter: MongoDBAdapter(clientPromise, { 
    databaseName: "lifeline" // Explicitly set lowercase database name
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};

          if (!email || !password) {
            throw new Error("Email and password are required");
          }

          const client = await clientPromise;
          // Ensure consistent database name usage
          const users = client.db("lifeline").collection("users");
          const user = await users.findOne({ email });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          // Only check password for users who registered with credentials
          if (!user.password) {
            throw new Error("Please sign in with the method you used to create your account");
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Credentials authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      try {
        console.log(`Sign-in attempt with provider: ${account?.provider}`);
        
        // Allow all OAuth sign-ins (Google, etc.)
        if (account?.provider !== "credentials") {
          return true;
        }

        // For credentials, the authorize function already handled validation
        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
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
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      try {
        // Handle production vs development URLs
        const productionUrl = process.env.NEXTAUTH_URL || baseUrl;

        // If it's a relative URL, prepend the base URL
        if (url.startsWith("/")) return `${productionUrl}${url}`;

        // If it's the same origin, allow it
        if (new URL(url).origin === productionUrl) return url;

        // Default to base URL
        return productionUrl;
      } catch (error) {
        console.error("Redirect callback error:", error);
        return baseUrl;
      }
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
  debug: process.env.NODE_ENV === 'development',
};
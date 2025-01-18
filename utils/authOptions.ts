import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import connectDB from "@/config/database";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/user.model";

declare module "next-auth" {
  interface Session {
    user: NextAuthUser & { id: string };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        return false; // Reject sign in if no email
      }
      await connectDB();
      const existUser = await User.findOne({ email: profile.email });
      if (!existUser) {
        await User.create({
          username: profile.name || "",
          email: profile.email,
          password: "",
          image: profile.image || "",
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = await User.findOne({ email: session.user.email });
        session.user = {
          ...session.user,
          id: user?._id.toString() || token.sub || "",
        };
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
};

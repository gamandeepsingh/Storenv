import connectDB from "@/config/database";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/user.model";

export const authOptions = {
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
    async signIn({ profile }: { profile: { email: string; name: string,image:string } }) {
      await connectDB();
      const existUser = await User.findOne({ email: profile.email });
      if (!existUser) {
        await User.create({
          username: profile.name,
          email: profile.email,
          password: "",
          image: profile.image,
        });
      }
      return true;
    },
    async session({ session }:{
      session: { user: { email: string; id: string | undefined } }
    }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user?._id.toString();
      return session;
    },
  },
};

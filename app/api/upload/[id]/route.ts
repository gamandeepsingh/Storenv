
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/database";
import Env from "@/models/env.model";
import User from "@/models/user.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { NextAuthOptions } from "next-auth";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "default-key";

function encryptValue(value: string): string {
  return CryptoJS.AES.encrypt(value, ENCRYPTION_KEY).toString();
}


export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
  
      const session = await getServerSession(authOptions as NextAuthOptions);
      if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
      const { projectName, envlist } = await req.json();
      const projectId = params.id;
  
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      let env = await Env.findOne({ _id: projectId, user: user._id });
      if (!env) {
        return NextResponse.json(
          { message: "Environment not found" },
          { status: 404 }
        );
      }
  
      // Update project name if changed
      if (projectName !== env.projectName) {
        env.projectName = projectName;
      }
  
      // Encrypt the updated environment variable values
      const encryptedEnvlist = envlist.map(
        (env: { name: string; value: string }) => ({
          name: env.name,
          value: encryptValue(env.value),
        })
      );
  
      env.envlist = encryptedEnvlist;
      await env.save();
  
      return NextResponse.json(
        { message: "Environment variables updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating environment variables:", error);
      return NextResponse.json(
        { message: "Failed to update environment variables" },
        { status: 500 }
      );
    }
  }
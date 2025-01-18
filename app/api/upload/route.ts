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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions as NextAuthOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { projectName, envlist } = await req.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Encrypt the environment variable values
    const encryptedEnvlist = envlist.map(
      (env: { name: string; value: string }) => ({
        name: env.name,
        value: encryptValue(env.value),
      })
    );

    let env = await Env.findOne({ projectName, user: user._id });

    if (env) {
      env.envlist = encryptedEnvlist;
      await env.save();
    } else {
      env = new Env({
        projectName,
        envlist: encryptedEnvlist,
        user: user._id,
      });
      await env.save();

      user.envs.push(env._id);
      await user.save();
    }

    return NextResponse.json(
      { message: "Environment variables saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving environment variables:", error);
    return NextResponse.json(
      { message: "Failed to save environment variables" },
      { status: 500 }
    );
  }
}

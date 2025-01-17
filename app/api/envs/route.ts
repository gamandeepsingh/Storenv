import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/database';
import Env from '@/models/env.model';
import User from '@/models/user.model';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { NextAuthOptions } from 'next-auth';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key';

function decryptValue(encryptedValue: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions as NextAuthOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const envs = await Env.find({ user: user._id }).select('-user');

    // Decrypt the environment variable values
    const decryptedEnvs = envs.map(env => ({
      ...env.toObject(),
      envlist: env.envlist.map((item: { name: string; value: string }) => ({
        name: item.name,
        value: decryptValue(item.value)
      }))
    }));

    return NextResponse.json(decryptedEnvs, { status: 200 });
  } catch (error) {
    console.error('Error fetching environment variables:', error);
    return NextResponse.json({ message: 'Failed to fetch environment variables' }, { status: 500 });
  }
}

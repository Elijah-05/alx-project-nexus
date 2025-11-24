/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "please-set-a-secret-in-env";
const TOKEN_NAME = "jobboard_token";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as Record<string, any>;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

export function createAuthCookie(token: string) {
  const secure = process.env.NODE_ENV === "production";
  // Set cookie string manually
  const maxAge = 7 * 24 * 60 * 60; // 7 days
  return `${TOKEN_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict${
    secure ? "; Secure" : ""
  }`;
}

export function clearAuthCookie() {
  return `${TOKEN_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`;
}

function parseCookies(cookieHeader?: string | null) {
  const obj: Record<string, string> = {};
  if (!cookieHeader) return obj;
  const parts = cookieHeader.split(";");
  for (const p of parts) {
    const [k, ...v] = p.split("=");
    if (!k) continue;
    obj[k.trim()] = decodeURIComponent(v.join("=").trim());
  }
  return obj;
}

export async function getUserFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies[TOKEN_NAME];
  if (!token) return null;
  const data = verifyToken(token);
  if (!data || !data.userId) return null;
  try {
    const { db } = await connectToDatabase();
    const _id = new ObjectId(String(data.userId));
    const user = await db.collection("users").findOne({ _id });
    if (!user) return null;
    return { ...user, _id: String(user._id) } as any;
  } catch (err) {
    console.error("Error in getUserFromRequest:", err);
    return null;
  }
}

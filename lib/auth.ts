import { SignJWT, jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error("AUTH_SECRET must be set to at least 32 characters.");
}
const key = new TextEncoder().encode(secret);

export async function createSession(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

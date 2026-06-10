import { SignJWT, jwtVerify } from "jose";

/**
 * Edge-safe JWT helpers (jose only — no Node/Prisma imports) so this module
 * can be used from both middleware (edge runtime) and server code.
 */

export const SESSION_COOKIE = "a88_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

export type Role = "ADMIN" | "AUTHOR";

export type SessionPayload = {
  sub: string; // user id
  email: string;
  role: Role;
};

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    const role = payload.role;
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      (role !== "ADMIN" && role !== "AUTHOR")
    ) {
      return null;
    }
    return { sub: payload.sub, email: payload.email, role };
  } catch {
    return null;
  }
}

import { Resend } from "resend";

/**
 * Lazily-constructed Resend client. We avoid throwing at module load so the
 * app still builds/renders without the key configured (e.g. in CI/previews);
 * server actions check `isEmailConfigured` before sending.
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

export const emailConfig = {
  /** Verified sender on your Resend domain, e.g. "A88 Finance <noreply@a88finance.com>". */
  from: process.env.RESEND_FROM_EMAIL ?? "A88 Finance <onboarding@resend.dev>",
  /** Inbox that receives lead notifications. */
  to: process.env.LEAD_INBOX_EMAIL ?? "info@a88finance.com",
};

export const isEmailConfigured = () => Boolean(process.env.RESEND_API_KEY);

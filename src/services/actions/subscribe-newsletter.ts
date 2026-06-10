"use server";

import { newsletterSchema, type ActionResult } from "@/lib/schemas";
import { emailConfig, getResend, isEmailConfigured } from "@/lib/resend";

export async function subscribeNewsletter(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { success: true, message: "You're subscribed. Thank you!" };
  }

  if (!isEmailConfigured()) {
    console.warn("[subscribeNewsletter] RESEND_API_KEY not set — skipping.", parsed.data.email);
    return { success: true, message: "You're subscribed. Thank you!" };
  }

  try {
    const resend = getResend();
    const { error } = await resend!.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: "New newsletter subscriber",
      text: `New subscriber: ${parsed.data.email}`,
    });

    if (error) {
      console.error("[subscribeNewsletter] Resend error:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }

    return { success: true, message: "You're subscribed. Thank you!" };
  } catch (err) {
    console.error("[subscribeNewsletter] Unexpected error:", err);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

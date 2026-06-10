"use server";

import { leadSchema, type ActionResult } from "@/lib/schemas";
import { emailConfig, getResend, isEmailConfigured } from "@/lib/resend";
import { LeadNotification } from "@/emails/lead-notification";

export async function submitLead(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    financeType: formData.get("financeType"),
    message: formData.get("message") ?? "",
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the highlighted fields and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, send nothing.
  if (parsed.data.company) {
    return { success: true, message: "Thanks! We'll be in touch shortly." };
  }

  if (!isEmailConfigured()) {
    // Don't block the user if email isn't wired up yet in this environment.
    console.warn("[submitLead] RESEND_API_KEY not set — skipping email send.", {
      name: parsed.data.name,
      financeType: parsed.data.financeType,
    });
    return {
      success: true,
      message: "Thanks! Your request has been received. We'll be in touch shortly.",
    };
  }

  try {
    const resend = getResend();
    const { error } = await resend!.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: parsed.data.email || undefined,
      subject: `New enquiry: ${parsed.data.name} — ${parsed.data.financeType}`,
      react: LeadNotification({
        ...parsed.data,
        submittedAt: new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Melbourne",
        }),
      }),
    });

    if (error) {
      console.error("[submitLead] Resend error:", error);
      return {
        success: false,
        message: "Something went wrong sending your request. Please call us on 0499 785 992.",
      };
    }

    return {
      success: true,
      message: "Thanks! Your request has been received. We'll be in touch within one business day.",
    };
  } catch (err) {
    console.error("[submitLead] Unexpected error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again or call us on 0499 785 992.",
    };
  }
}

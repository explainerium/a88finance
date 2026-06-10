import { z } from "zod";
import { financeTypes } from "@/lib/site-config";

/**
 * Lead / callback request — used by the home callback widget,
 * the contact page, and the apply page.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is too long."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(20, "That phone number is too long.")
    .regex(/^[0-9+()\s-]+$/, "Please enter a valid phone number."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  financeType: z.enum(financeTypes, {
    message: "Please choose a finance type.",
  }),
  message: z.string().trim().max(2000, "Message is too long.").optional(),
  // Honeypot — must stay empty (bots fill it in).
  company: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

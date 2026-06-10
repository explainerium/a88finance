"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/services/actions/subscribe-newsletter";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();

  function action(formData: FormData) {
    startTransition(async () => {
      const result = await subscribeNewsletter(undefined, formData);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  return (
    <form
      className="news-form"
      action={action}
      onSubmit={(e) => {
        // Let the form action run; reset after submit.
        const formEl = e.currentTarget;
        setTimeout(() => formEl.reset(), 0);
      }}
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email address"
        aria-label="Email address"
        required
      />
      <button type="submit" className="btn btn-gold" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" size={16} /> : "Subscribe"}
      </button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import { input, label } from "@/components/admin/classes";

export function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useActionState(loginAction, initialFormState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={from} />

      <div>
        <label htmlFor="identifier" className={label}>
          Email or username
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          required
          className={input}
          placeholder="you@a88finance.com"
        />
      </div>

      <div>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={input}
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton className="w-full rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-gold-deep hover:text-white disabled:opacity-60" pendingLabel="Signing in…">
        Sign in
      </SubmitButton>
    </form>
  );
}

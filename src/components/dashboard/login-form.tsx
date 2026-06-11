"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useActionState(loginAction, initialFormState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="from" value={from} />

      <div className="space-y-1.5">
        <Label htmlFor="identifier">Email or username</Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          required
          placeholder="you@a88finance.com"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}

      <SubmitButton
        className="w-full rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-gold-deep hover:text-white disabled:opacity-60"
        pendingLabel="Signing in…"
      >
        Sign in
      </SubmitButton>
    </form>
  );
}

"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { type FormState, initialFormState } from "@/lib/actions/form-state";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

function Button({
  confirm,
  className,
  pendingLabel,
  children,
}: {
  confirm?: string;
  className?: string;
  pendingLabel?: string;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {pending ? (pendingLabel ?? "…") : children}
    </button>
  );
}

/**
 * A self-contained <form> wrapping a server action that returns a FormState.
 * Surfaces errors / success via toast. Used for row-level mutations like
 * delete and publish-toggle.
 */
export function ActionButton({
  action,
  fields,
  confirm,
  className,
  pendingLabel,
  successMessage,
  children,
}: {
  action: Action;
  fields?: Record<string, string>;
  confirm?: string;
  className?: string;
  pendingLabel?: string;
  successMessage?: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialFormState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.ok && successMessage) toast.success(successMessage);
  }, [state, successMessage]);

  return (
    <form action={formAction}>
      {fields &&
        Object.entries(fields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
      <Button confirm={confirm} className={className} pendingLabel={pendingLabel}>
        {children}
      </Button>
    </form>
  );
}

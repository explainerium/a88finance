"use client";

import { useFormStatus } from "react-dom";
import { btnPrimary } from "./classes";

export function SubmitButton({
  children,
  className = btnPrimary,
  pendingLabel = "Saving…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}

"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createTagAction } from "@/lib/actions/taxonomy";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import { errorText, input, label } from "@/components/admin/classes";

export function TagCreateForm() {
  const [state, formAction] = useActionState(createTagAction, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    else if (state?.ok) {
      toast.success("Tag created.");
      formRef.current?.reset();
    }
  }, [state]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="tag-name" className={label}>
          Name
        </label>
        <input
          id="tag-name"
          name="name"
          required
          className={input}
          placeholder="refinancing"
        />
        {fieldError("name") && <p className={errorText}>{fieldError("name")}</p>}
      </div>
      <div>
        <label htmlFor="tag-slug" className={label}>
          Slug
        </label>
        <input
          id="tag-slug"
          name="slug"
          className={input}
          placeholder="auto from name"
        />
      </div>
      <SubmitButton>Add tag</SubmitButton>
    </form>
  );
}

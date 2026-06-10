"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createTagAction } from "@/lib/actions/taxonomy";
import { initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import { errorText } from "@/components/admin/classes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="space-y-1.5">
        <Label htmlFor="tag-name">Name</Label>
        <Input id="tag-name" name="name" required placeholder="refinancing" />
        {fieldError("name") && <p className={errorText}>{fieldError("name")}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="tag-slug">Slug</Label>
        <Input id="tag-slug" name="slug" placeholder="auto from name" />
      </div>
      <SubmitButton>Add tag</SubmitButton>
    </form>
  );
}

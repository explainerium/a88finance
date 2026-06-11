"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type FormState, initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { errorText, help } from "@/components/dashboard/classes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type CategoryFormValues = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

const EMPTY: CategoryFormValues = { id: "", name: "", slug: "", description: "" };

export function CategoryForm({
  action,
  category = EMPTY,
  submitLabel,
  redirectOnDone,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  category?: CategoryFormValues;
  submitLabel: string;
  redirectOnDone?: string;
}) {
  const isEdit = Boolean(category.id);
  const [state, formAction] = useActionState(action, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    } else if (state?.ok) {
      toast.success(isEdit ? "Category saved." : "Category created.");
      if (redirectOnDone) router.push(redirectOnDone);
      else formRef.current?.reset();
    }
  }, [state, isEdit, redirectOnDone, router]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {isEdit && <input type="hidden" name="id" value={category.id} />}

      <div className="space-y-1.5">
        <Label htmlFor="cat-name">Name</Label>
        <Input
          id="cat-name"
          name="name"
          defaultValue={category.name}
          required
          placeholder="Car Finance"
        />
        {fieldError("name") && <p className={errorText}>{fieldError("name")}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cat-slug">Slug</Label>
        <Input
          id="cat-slug"
          name="slug"
          defaultValue={category.slug}
          placeholder="auto from name"
        />
        <p className={help}>Powers /blog/category/[slug].</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cat-desc">
          Description{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="cat-desc"
          name="description"
          defaultValue={category.description}
          rows={2}
        />
      </div>

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}

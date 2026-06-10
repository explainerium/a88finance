"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { type FormState, initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import { errorText, help, input, label } from "@/components/admin/classes";

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

      <div>
        <label htmlFor="cat-name" className={label}>
          Name
        </label>
        <input
          id="cat-name"
          name="name"
          defaultValue={category.name}
          required
          className={input}
          placeholder="Car Finance"
        />
        {fieldError("name") && <p className={errorText}>{fieldError("name")}</p>}
      </div>

      <div>
        <label htmlFor="cat-slug" className={label}>
          Slug
        </label>
        <input
          id="cat-slug"
          name="slug"
          defaultValue={category.slug}
          className={input}
          placeholder="auto from name"
        />
        <p className={help}>Powers /blog/category/[slug].</p>
      </div>

      <div>
        <label htmlFor="cat-desc" className={label}>
          Description <span className="font-normal normal-case">(optional)</span>
        </label>
        <textarea
          id="cat-desc"
          name="description"
          defaultValue={category.description}
          rows={2}
          className={input}
        />
      </div>

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}

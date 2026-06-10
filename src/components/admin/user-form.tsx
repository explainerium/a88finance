"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { type FormState, initialFormState } from "@/lib/actions/form-state";
import { SubmitButton } from "@/components/admin/submit-button";
import {
  btnGhost,
  card,
  errorText,
  help,
  input,
  label,
} from "@/components/admin/classes";

export type UserFormValues = {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  role: "ADMIN" | "AUTHOR";
};

const EMPTY: UserFormValues = {
  id: "",
  name: "",
  email: "",
  username: "",
  image: "",
  role: "AUTHOR",
};

export function UserForm({
  action,
  user = EMPTY,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  user?: UserFormValues;
  submitLabel: string;
}) {
  const isEdit = Boolean(user.id);
  const [state, formAction] = useActionState(action, initialFormState);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {isEdit && <input type="hidden" name="id" value={user.id} />}

      <div className={`${card} space-y-4`}>
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={user.name}
            className={input}
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          {isEdit ? (
            <>
              <input
                id="email"
                value={user.email}
                disabled
                className={`${input} cursor-not-allowed bg-brand-paper-2`}
              />
              <p className={help}>Email can't be changed after creation.</p>
            </>
          ) : (
            <>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
                className={input}
                placeholder="jane@a88finance.com"
              />
              {fieldError("email") && (
                <p className={errorText}>{fieldError("email")}</p>
              )}
            </>
          )}
        </div>

        <div>
          <label htmlFor="username" className={label}>
            Username <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            id="username"
            name="username"
            defaultValue={user.username}
            className={input}
            placeholder="jane"
          />
          {fieldError("username") && (
            <p className={errorText}>{fieldError("username")}</p>
          )}
          <p className={help}>Alternative login identifier. Must be unique.</p>
        </div>

        <div>
          <label htmlFor="image" className={label}>
            Profile image URL <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            id="image"
            name="image"
            defaultValue={user.image}
            className={input}
            placeholder="https://…"
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
            autoComplete="new-password"
            required={!isEdit}
            className={input}
            placeholder={isEdit ? "Leave blank to keep current" : "At least 8 characters"}
          />
          {fieldError("password") && (
            <p className={errorText}>{fieldError("password")}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className={label}>
            Role
          </label>
          <select
            id="role"
            name="role"
            defaultValue={user.role}
            className={input}
          >
            <option value="AUTHOR">Author</option>
            <option value="ADMIN">Admin</option>
          </select>
          <p className={help}>
            Admins manage users and settings. Authors manage only their own posts.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link href="/admin/users" className={btnGhost}>
          Cancel
        </Link>
      </div>
    </form>
  );
}

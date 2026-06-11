"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { type FormState, initialFormState } from "@/lib/actions/form-state";
import { uploadImageAction } from "@/lib/actions/upload";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { btnGhost, card, errorText, help } from "@/components/dashboard/classes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [image, setImage] = useState(user.image);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  async function onImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImageAction(fd);
      if (res.error || !res.url) {
        toast.error(res.error ?? "Upload failed.");
        return;
      }
      setImage(res.url);
      toast.success("Profile image uploaded.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {isEdit && <input type="hidden" name="id" value={user.id} />}

      <div className={`${card} space-y-4`}>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={user.name}
            placeholder="Jane Doe"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          {isEdit ? (
            <>
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-brand-paper-2"
              />
              <p className={help}>Email can&apos;t be changed after creation.</p>
            </>
          ) : (
            <>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
                placeholder="jane@a88finance.com"
              />
              {fieldError("email") && (
                <p className={errorText}>{fieldError("email")}</p>
              )}
            </>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="username">
            Username{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="username"
            name="username"
            defaultValue={user.username}
            placeholder="jane"
          />
          {fieldError("username") && (
            <p className={errorText}>{fieldError("username")}</p>
          )}
          <p className={help}>Alternative login identifier. Must be unique.</p>
        </div>

        <div className="space-y-1.5">
          <Label>
            Profile image{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="flex items-center gap-4">
            {image ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Profile preview"
                  className="size-16 rounded-full border border-input object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  title="Remove image"
                  className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-brand-ink text-white"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <span className="grid size-16 place-items-center rounded-full border border-dashed border-input bg-brand-paper-2 text-brand-ink-3">
                <ImagePlus className="size-5" />
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ImagePlus className="size-4" />
              )}
              {uploading ? "Uploading…" : image ? "Change image" : "Upload image"}
            </Button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageFile}
          />
          <input type="hidden" name="image" value={image} />
          <p className={help}>Stored on Cloudinary.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required={!isEdit}
            placeholder={
              isEdit ? "Leave blank to keep current" : "At least 8 characters"
            }
          />
          {fieldError("password") && (
            <p className={errorText}>{fieldError("password")}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="role">Role</Label>
          <Select name="role" defaultValue={user.role}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUTHOR">Author</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
          <p className={help}>
            Admins manage users and settings. Authors manage only their own
            posts.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link href="/dashboard/users" className={btnGhost}>
          Cancel
        </Link>
      </div>
    </form>
  );
}

"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ImagePlus, Loader2, RotateCcw, X } from "lucide-react";
import { type FormState, initialFormState } from "@/lib/actions/form-state";
import { slugify } from "@/lib/slug";
import { uploadImageAction } from "@/lib/actions/upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { RichEditor } from "@/components/admin/rich-editor";
import { btnGhost, card, errorText, help } from "@/components/admin/classes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";

type Option = { id: string; name: string };

export type PostFormValues = {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  coverImage: string;
  coverImageAlt: string;
  published: boolean;
  categoryIds: string[];
  tagIds: string[];
};

const EMPTY: PostFormValues = {
  id: "",
  title: "",
  slug: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  coverImage: "",
  coverImageAlt: "",
  published: false,
  categoryIds: [],
  tagIds: [],
};

export function PostForm({
  action,
  categories,
  tags,
  post = EMPTY,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  categories: Option[];
  tags: Option[];
  post?: PostFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, initialFormState);

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(post.slug));

  const [coverImage, setCoverImage] = useState(post.coverImage);
  const [coverUploading, setCoverUploading] = useState(false);
  const coverFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  const fieldError = (name: string) => state?.fieldErrors?.[name]?.[0];

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setCoverUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImageAction(fd);
      if (res.error || !res.url) {
        toast.error(res.error ?? "Upload failed.");
        return;
      }
      setCoverImage(res.url);
      toast.success("Cover image uploaded.");
    } finally {
      setCoverUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      {post.id && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main column */}
        <div className="space-y-6">
          <div className={`${card} space-y-4`}>
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(ev) => onTitleChange(ev.target.value)}
                required
                placeholder="Five signs you're ready for a business loan"
              />
              {fieldError("title") && (
                <p className={errorText}>{fieldError("title")}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <InputGroup>
                <InputGroupAddon>/blog/</InputGroupAddon>
                <InputGroupInput
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(ev) => {
                    setSlug(ev.target.value);
                    setSlugTouched(true);
                  }}
                  placeholder="auto-generated-from-title"
                />
                <InputGroupButton
                  title="Regenerate from title"
                  onClick={() => {
                    setSlug(slugify(title));
                    setSlugTouched(false);
                  }}
                >
                  <RotateCcw className="size-4" />
                </InputGroupButton>
              </InputGroup>
              <p className={help}>
                Auto-fills from the title until you edit it. Duplicate slugs get a
                numeric suffix on save.
              </p>
            </div>
          </div>

          <div className={`${card} space-y-2`}>
            <Label>Content</Label>
            <RichEditor name="content" initialHTML={post.content} />
            {fieldError("content") && (
              <p className={errorText}>{fieldError("content")}</p>
            )}
            <p className={help}>
              The excerpt is generated automatically from this content on save.
            </p>
          </div>

          <div className={`${card} space-y-4`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              SEO
            </h2>
            <div className="space-y-1.5">
              <Label htmlFor="metaTitle">Meta title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                defaultValue={post.metaTitle}
                placeholder="Custom <title> (defaults to the post title)"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                defaultValue={post.metaDescription}
                rows={3}
                placeholder="Used for search results and social previews (falls back to the auto excerpt)."
              />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <div className={`${card} space-y-3`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              Cover image
            </h2>

            {coverImage ? (
              <div className="group relative overflow-hidden rounded-lg border border-input">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="aspect-video w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-brand-ink/70 text-white opacity-0 transition-opacity hover:bg-brand-ink group-hover:opacity-100"
                  title="Remove cover image"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={coverUploading}
                onClick={() => coverFileRef.current?.click()}
                className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-brand-paper-2 text-sm text-brand-ink-3 transition-colors hover:border-brand-gold hover:text-brand-ink disabled:opacity-60"
              >
                {coverUploading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ImagePlus className="size-5" />
                )}
                {coverUploading ? "Uploading…" : "Upload cover image"}
              </button>
            )}

            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onCoverFile}
            />
            <input type="hidden" name="coverImage" value={coverImage} />

            <div className="space-y-1.5">
              <Label htmlFor="coverImageAlt">Alt text</Label>
              <Input
                id="coverImageAlt"
                name="coverImageAlt"
                defaultValue={post.coverImageAlt}
                placeholder="Describe the image"
              />
            </div>
            <p className={help}>
              Stored on Cloudinary. Alt text helps SEO &amp; accessibility.
            </p>
          </div>

          <div className={`${card} space-y-3`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              Categories
            </h2>
            {categories.length === 0 ? (
              <p className={help}>No categories yet.</p>
            ) : (
              <div className="space-y-2.5">
                {categories.map((c) => (
                  <Label
                    key={c.id}
                    className="gap-2.5 font-normal text-brand-ink"
                  >
                    <Checkbox
                      name="categoryIds"
                      value={c.id}
                      defaultChecked={post.categoryIds.includes(c.id)}
                    />
                    {c.name}
                  </Label>
                ))}
              </div>
            )}
          </div>

          <div className={`${card} space-y-3`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              Tags
            </h2>
            {tags.length === 0 ? (
              <p className={help}>No tags yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Label
                    key={t.id}
                    className="gap-1.5 rounded-full border border-input px-3 py-1 text-xs font-normal text-brand-ink"
                  >
                    <Checkbox
                      name="tagIds"
                      value={t.id}
                      defaultChecked={post.tagIds.includes(t.id)}
                      className="size-3.5"
                    />
                    {t.name}
                  </Label>
                ))}
              </div>
            )}
          </div>

          <div className={`${card} flex flex-col gap-2`}>
            {/* Publish state is managed from the posts list; preserve it on save. */}
            <input
              type="hidden"
              name="published"
              value={post.published ? "on" : ""}
            />
            <SubmitButton>{submitLabel}</SubmitButton>
            <Link href="/admin/posts" className={btnGhost}>
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
    </form>
  );
}

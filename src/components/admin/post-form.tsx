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
import {
  btnGhost,
  card,
  errorText,
  help,
  input,
  label,
} from "@/components/admin/classes";

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

  // Title → slug live autofill (until the slug is manually edited).
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(post.slug));

  // Cover image upload.
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
            <div>
              <label htmlFor="title" className={label}>
                Title
              </label>
              <input
                id="title"
                name="title"
                value={title}
                onChange={(ev) => onTitleChange(ev.target.value)}
                required
                className={`${input} text-base`}
                placeholder="Five signs you're ready for a business loan"
              />
              {fieldError("title") && (
                <p className={errorText}>{fieldError("title")}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className={label}>
                Slug
              </label>
              <div className="flex items-stretch overflow-hidden rounded-lg border border-border focus-within:border-brand-gold">
                <span className="flex items-center bg-brand-paper-2 px-3 text-sm text-brand-ink-3">
                  /blog/
                </span>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(ev) => {
                    setSlug(ev.target.value);
                    setSlugTouched(true);
                  }}
                  className="min-w-0 flex-1 bg-white px-3 py-2 text-sm text-brand-ink outline-none"
                  placeholder="auto-generated-from-title"
                />
                <button
                  type="button"
                  title="Regenerate from title"
                  onClick={() => {
                    setSlug(slugify(title));
                    setSlugTouched(false);
                  }}
                  className="flex items-center gap-1 border-l border-border px-2 text-xs text-brand-ink-3 hover:bg-brand-paper-2 hover:text-brand-ink"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
              <p className={help}>
                Auto-fills from the title until you edit it. Duplicate slugs get a
                numeric suffix on save.
              </p>
            </div>
          </div>

          <div className={`${card} space-y-2`}>
            <label className={label}>Content</label>
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
            <div>
              <label htmlFor="metaTitle" className={label}>
                Meta title
              </label>
              <input
                id="metaTitle"
                name="metaTitle"
                defaultValue={post.metaTitle}
                className={input}
                placeholder="Custom <title> (defaults to the post title)"
              />
            </div>
            <div>
              <label htmlFor="metaDescription" className={label}>
                Meta description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                defaultValue={post.metaDescription}
                rows={3}
                className={input}
                placeholder="Used for search results and social previews (falls back to the auto excerpt)."
              />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <div className={`${card} space-y-4`}>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                defaultChecked={post.published}
                className="size-4 rounded border-border accent-brand-gold"
              />
              <span className="text-sm font-semibold text-brand-ink">
                Published
              </span>
            </label>
            <p className={help}>
              Unpublished posts stay as drafts (hidden from the blog).
            </p>
            <div className="flex flex-col gap-2">
              <SubmitButton>{submitLabel}</SubmitButton>
              <Link href="/admin/posts" className={btnGhost}>
                Cancel
              </Link>
            </div>
          </div>

          <div className={`${card} space-y-3`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              Cover image
            </h2>

            {coverImage ? (
              <div className="group relative overflow-hidden rounded-lg border border-border">
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
                className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-brand-paper-2 text-sm text-brand-ink-3 transition-colors hover:border-brand-gold hover:text-brand-ink disabled:opacity-60"
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

            <div>
              <label htmlFor="coverImageAlt" className={label}>
                Alt text
              </label>
              <input
                id="coverImageAlt"
                name="coverImageAlt"
                defaultValue={post.coverImageAlt}
                className={input}
                placeholder="Describe the image"
              />
            </div>
            <p className={help}>Stored on Cloudinary. Alt text helps SEO &amp; accessibility.</p>
          </div>

          <div className={`${card} space-y-3`}>
            <h2 className="font-display text-base font-semibold text-brand-ink">
              Categories
            </h2>
            {categories.length === 0 ? (
              <p className={help}>No categories yet.</p>
            ) : (
              <div className="space-y-2">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="categoryIds"
                      value={c.id}
                      defaultChecked={post.categoryIds.includes(c.id)}
                      className="size-4 rounded border-border accent-brand-gold"
                    />
                    <span className="text-brand-ink">{c.name}</span>
                  </label>
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
                  <label
                    key={t.id}
                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-brand-ink"
                  >
                    <input
                      type="checkbox"
                      name="tagIds"
                      value={t.id}
                      defaultChecked={post.tagIds.includes(t.id)}
                      className="size-3.5 rounded border-border accent-brand-gold"
                    />
                    {t.name}
                  </label>
                ))}
              </div>
            )}
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

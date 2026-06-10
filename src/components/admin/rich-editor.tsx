"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { toast } from "sonner";
import {
  Bold,
  Code,
  Code2,
  Highlighter,
  Image as ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { uploadImageAction } from "@/lib/actions/upload";
import { cn } from "@/lib/utils";

function normalize(html: string): string {
  return html && html !== "<p></p>" ? html : "";
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center rounded-md text-brand-ink-3 transition-colors hover:bg-white hover:text-brand-ink disabled:opacity-40",
        active && "bg-white text-brand-gold-deep shadow-sm",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" />;
}

export function RichEditor({
  name,
  initialHTML = "",
}: {
  name: string;
  initialHTML?: string;
}) {
  "use no memo"; // TipTap's editor state must not be memoized by React Compiler

  const [html, setHtml] = useState(() => normalize(initialHTML));
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Highlight,
      TiptapImage.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      Placeholder.configure({
        placeholder: "Write your article… use the toolbar for headings, quotes, code, images and more.",
      }),
    ],
    content: normalize(initialHTML),
    editorProps: {
      attributes: {
        class: "article-body min-h-[360px] max-w-none px-4 py-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? "" : editor.getHTML()),
  });

  const uploadAndInsert = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await uploadImageAction(fd);
        if (res.error || !res.url) {
          toast.error(res.error ?? "Upload failed.");
          return;
        }
        const alt = window.prompt("Alt text (for accessibility & SEO):", "") ?? "";
        const title = window.prompt("Image title (optional, shown on hover):", "") ?? "";
        editor
          .chain()
          .focus()
          .setImage({ src: res.url, alt, title: title || undefined })
          .run();
        toast.success("Image added.");
      } finally {
        setUploading(false);
      }
    },
    [editor],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void uploadAndInsert(file);
    e.target.value = "";
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL:", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-border bg-white text-sm text-brand-ink-3">
        Loading editor…
      </div>
    );
  }

  const e: Editor = editor;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-brand-paper-2 px-2 py-1.5">
        <ToolbarButton title="Bold" active={e.isActive("bold")} onClick={() => e.chain().focus().toggleBold().run()}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={e.isActive("italic")} onClick={() => e.chain().focus().toggleItalic().run()}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={e.isActive("underline")} onClick={() => e.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Strikethrough" active={e.isActive("strike")} onClick={() => e.chain().focus().toggleStrike().run()}>
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Highlight" active={e.isActive("highlight")} onClick={() => e.chain().focus().toggleHighlight().run()}>
          <Highlighter className="size-4" />
        </ToolbarButton>

        <Divider />

        <select
          title="Text style"
          aria-label="Text style"
          value={
            ([1, 2, 3, 4, 5, 6].find((l) =>
              e.isActive("heading", { level: l }),
            )?.toString()) ?? "p"
          }
          onChange={(ev) => {
            const v = ev.target.value;
            if (v === "p") {
              e.chain().focus().setParagraph().run();
            } else {
              e.chain()
                .focus()
                .setHeading({ level: Number(v) as 1 | 2 | 3 | 4 | 5 | 6 })
                .run();
            }
          }}
          className="h-8 rounded-md border border-input bg-white px-2 text-sm text-brand-ink outline-none transition-colors hover:bg-white focus:border-brand-gold"
        >
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <Divider />

        <ToolbarButton title="Bullet list" active={e.isActive("bulletList")} onClick={() => e.chain().focus().toggleBulletList().run()}>
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={e.isActive("orderedList")} onClick={() => e.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={e.isActive("blockquote")} onClick={() => e.chain().focus().toggleBlockquote().run()}>
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Inline code" active={e.isActive("code")} onClick={() => e.chain().focus().toggleCode().run()}>
          <Code className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Code block" active={e.isActive("codeBlock")} onClick={() => e.chain().focus().toggleCodeBlock().run()}>
          <Code2 className="size-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Link" active={e.isActive("link")} onClick={setLink}>
          <Link2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Remove link" disabled={!e.isActive("link")} onClick={() => e.chain().focus().unsetLink().run()}>
          <Link2Off className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Insert image" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Undo" disabled={!e.can().undo()} onClick={() => e.chain().focus().undo().run()}>
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Redo" disabled={!e.can().redo()} onClick={() => e.chain().focus().redo().run()}>
          <Redo2 className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />

      <input type="hidden" name={name} value={html} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}

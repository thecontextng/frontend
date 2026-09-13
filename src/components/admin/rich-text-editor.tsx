"use client";

import Link from "@tiptap/extension-link";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-sm text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-accent/10 text-accent" : "text-muted hover:bg-background hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, htmlMode, onToggleHtmlMode }: { editor: Editor | null; htmlMode: boolean; onToggleHtmlMode: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card px-2 py-1.5">
      <ToolbarButton
        label="Bold"
        active={editor?.isActive("bold")}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor?.isActive("italic")}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        active={editor?.isActive("heading", { level: 2 })}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor?.isActive("heading", { level: 3 })}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <ToolbarButton
        label="Bullet list"
        active={editor?.isActive("bulletList")}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        •≡
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor?.isActive("orderedList")}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1≡
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor?.isActive("blockquote")}
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        &ldquo;
      </ToolbarButton>
      <ToolbarButton
        label="Link"
        active={editor?.isActive("link")}
        disabled={!editor || htmlMode}
        onClick={() => {
          if (!editor) return;
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = window.prompt("Link URL");
          if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
      >
        🔗
      </ToolbarButton>
      <ToolbarButton
        label="Undo"
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().undo().run()}
      >
        ↶
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor || htmlMode}
        onClick={() => editor?.chain().focus().redo().run()}
      >
        ↷
      </ToolbarButton>

      <div className="ml-auto">
        <button
          type="button"
          onClick={onToggleHtmlMode}
          className="tag-text rounded-sm px-2.5 py-1.5 text-muted hover:bg-background hover:text-foreground"
        >
          {htmlMode ? "Rich text" : "View HTML"}
        </button>
      </div>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [htmlMode, setHtmlMode] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "article-prose min-h-[16rem] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor || htmlMode) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, htmlMode, editor]);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40">
      <Toolbar editor={editor} htmlMode={htmlMode} onToggleHtmlMode={() => setHtmlMode((prev) => !prev)} />

      {htmlMode ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={12}
          className="w-full bg-background px-4 py-3 font-mono text-sm text-foreground focus:outline-none"
          placeholder="HTML markup (<p>, <h2>, <figure>…)"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}

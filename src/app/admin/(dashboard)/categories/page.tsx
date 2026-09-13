"use client";

import { useState } from "react";
import { RowActionsMenu } from "@/components/admin/row-actions-menu";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useListCategoriesQuery,
  useUpdateCategoryMutation,
  type Category,
} from "@/store/api-endpoints";

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none";

function EditableRow({
  category,
  onCancel,
}: {
  category: Category;
  onCancel: () => void;
}) {
  const [name, setName] = useState(category.name);
  const [slug, setSlug] = useState(category.slug);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    try {
      await updateCategory({
        id: category.id,
        updateCategoryInput: { name, slug },
      }).unwrap();
      onCancel();
    } catch {
      setError("Something went wrong updating this category. Please try again.");
    }
  }

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} />
      </td>
      <td className="px-4 py-3">
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={INPUT_CLASS} />
        {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-background"
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useListCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    try {
      await createCategory({
        createCategoryInput: { name, slug: slug || undefined },
      }).unwrap();
      setName("");
      setSlug("");
    } catch {
      setCreateError("Something went wrong creating this category. Please try again.");
    }
  }

  function handleDelete(category: Category) {
    if (!window.confirm(`Delete "${category.name}"? Articles in this category will be unassigned.`))
      return;
    deleteCategory({ id: category.id });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Categories</h1>
        <p className="mt-1 text-sm text-muted">Manage the sections articles are organized under.</p>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-muted">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Energy Transition"
            required
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-muted">
            Slug <span className="text-muted/70">(optional)</span>
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated from name"
            className={INPUT_CLASS}
          />
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Add category
        </button>
      </form>
      {createError ? <p className="text-sm text-red-500">{createError}</p> : null}

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !categories ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No categories yet.
                </td>
              </tr>
            ) : (
              categories.map((category) =>
                editingId === category.id ? (
                  <EditableRow
                    key={category.id}
                    category={category}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <tr key={category.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 font-medium text-foreground">{category.name}</td>
                    <td className="px-4 py-3 text-muted">{category.slug}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        <RowActionsMenu
                          actions={[
                            { label: "Edit", onSelect: () => setEditingId(category.id) },
                            {
                              label: "Delete",
                              variant: "danger",
                              onSelect: () => handleDelete(category),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

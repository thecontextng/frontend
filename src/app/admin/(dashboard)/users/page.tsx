"use client";

import { useState } from "react";
import { RowActionsMenu } from "@/components/admin/row-actions-menu";
import { Select } from "@/components/admin/select";
import { formatDate } from "@/lib/format-date";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useListUsersQuery,
  useResetUserPasswordMutation,
  useUpdateUserMutation,
  type User,
} from "@/store/api-endpoints";

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "author", label: "Author" },
];

function ROLE_STYLE(role: string) {
  return role === "admin"
    ? "bg-accent/10 text-accent"
    : role === "editor"
      ? "bg-foreground/10 text-foreground"
      : "bg-muted/10 text-muted";
}

function EditableRow({ user, onCancel }: { user: User; onCancel: () => void }) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setError(null);
    try {
      await updateUser({
        id: user.id,
        updateUserInput: { name, role: role as User["role"] },
      }).unwrap();
      onCancel();
    } catch {
      setError("Something went wrong updating this user. Please try again.");
    }
  }

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT_CLASS} />
        {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
      </td>
      <td className="px-4 py-3 text-muted">{user.email}</td>
      <td className="px-4 py-3">
        <Select value={role} onValueChange={(value) => setRole(value as User["role"])} options={ROLE_OPTIONS} />
      </td>
      <td className="px-4 py-3 text-muted">{formatDate(user.created_at)}</td>
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

export default function AdminUsersPage() {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: users, isLoading } = useListUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [resetUserPassword] = useResetUserPasswordMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("author");
  const [createError, setCreateError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    try {
      await createUser({
        createUserInput: { email, password, name, role: role as User["role"] },
      }).unwrap();
      setEmail("");
      setPassword("");
      setName("");
      setRole("author");
    } catch {
      setCreateError("Something went wrong creating this account. Please try again.");
    }
  }

  function handleResetPassword(user: User) {
    const newPassword = window.prompt(`New password for ${user.email} (min 8 characters):`);
    if (!newPassword) return;
    if (newPassword.length < 8) {
      window.alert("Password must be at least 8 characters.");
      return;
    }
    resetUserPassword({ id: user.id, resetPasswordInput: { password: newPassword } });
  }

  function handleDelete(user: User) {
    if (!window.confirm(`Delete ${user.email}? This can't be undone.`)) return;
    deleteUser({ id: user.id });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Users</h1>
        <p className="mt-1 text-sm text-muted">Manage newsroom accounts and access.</p>
      </div>

      <form
        onSubmit={handleCreate}
        className="grid grid-cols-1 gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className={INPUT_CLASS} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Role</label>
          <Select value={role} onValueChange={setRole} options={ROLE_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={isCreating}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Add user
        </button>
      </form>
      {createError ? <p className="text-sm text-red-500">{createError}</p> : null}

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !users ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((user) =>
                editingId === user.id ? (
                  <EditableRow key={user.id} user={user} onCancel={() => setEditingId(null)} />
                ) : (
                  <tr key={user.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`tag-text rounded-full px-2.5 py-1 ${ROLE_STYLE(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(user.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end">
                        <RowActionsMenu
                          actions={[
                            { label: "Edit", onSelect: () => setEditingId(user.id) },
                            {
                              label: "Reset password",
                              onSelect: () => handleResetPassword(user),
                            },
                            ...(user.id === currentUser?.id
                              ? []
                              : [
                                  {
                                    label: "Delete",
                                    variant: "danger" as const,
                                    onSelect: () => handleDelete(user),
                                  },
                                ]),
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

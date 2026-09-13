"use client";

import { formatDate } from "@/lib/format-date";
import {
  useDeleteSubscriberMutation,
  useListSubscribersQuery,
  type Subscriber,
} from "@/store/api-endpoints";

export default function AdminSubscribersPage() {
  const { data: subscribers, isLoading } = useListSubscribersQuery();
  const [deleteSubscriber] = useDeleteSubscriberMutation();

  function handleDelete(subscriber: Subscriber) {
    if (!window.confirm(`Remove ${subscriber.email} from the subscriber list?`)) return;
    deleteSubscriber({ id: subscriber.id });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Subscribers</h1>
        <p className="mt-1 text-sm text-muted">
          {isLoading || !subscribers
            ? "Loading…"
            : `${subscribers.length} ${subscribers.length === 1 ? "person" : "people"} signed up for email updates.`}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Subscribed</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !subscribers ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3 font-medium text-foreground">{subscriber.email}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(subscriber.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(subscriber)}
                      className="rounded-md px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

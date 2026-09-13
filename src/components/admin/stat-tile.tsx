export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <span className="tag-text text-muted">{label}</span>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
    </div>
  );
}

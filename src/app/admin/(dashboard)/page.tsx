"use client";

import { HorizontalBarChart, PublishTimelineChart } from "@/components/admin/charts";
import { StatTile } from "@/components/admin/stat-tile";
import { useGetArticleStatsQuery } from "@/store/api-endpoints";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useGetArticleStatsQuery();

  if (isLoading || !stats) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  const published = stats.byStatus.find((s) => s.status === "published")?.count ?? 0;
  const draft = stats.byStatus.find((s) => s.status === "draft")?.count ?? 0;
  const archived = stats.byStatus.find((s) => s.status === "archived")?.count ?? 0;
  const images = stats.mediaMix.find((m) => m.type === "image")?.count ?? 0;
  const videos = stats.mediaMix.find((m) => m.type === "video")?.count ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">An overview of everything in the newsroom.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Total articles" value={stats.total} />
        <StatTile label="Published" value={published} />
        <StatTile label="Drafts" value={draft} />
        <StatTile label="Archived" value={archived} />
        <StatTile label="Images" value={images} />
        <StatTile label="Videos" value={videos} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <HorizontalBarChart
          title="Articles by category"
          data={stats.byCategory.map((category) => ({ label: category.name, value: category.count }))}
        />
        <HorizontalBarChart
          title="Articles by status"
          data={stats.byStatus.map((entry) => ({
            label: entry.status[0].toUpperCase() + entry.status.slice(1),
            value: entry.count,
          }))}
        />
        <HorizontalBarChart
          title="Top authors"
          data={stats.topAuthors.map((author) => ({ label: author.name, value: author.count }))}
        />
        <PublishTimelineChart data={stats.byMonth} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { SocialIcons } from "@/components/social-icons";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Talk to Us",
  description: "Contact thecontext editorial, press, and general inquiries.",
};

const CONTACT_CHANNELS = [
  {
    label: "General inquiries",
    email: "hello@thecontext.com",
    description: "Questions about the site, partnerships, or anything else.",
  },
  {
    label: "Editorial tips & corrections",
    email: "tips@thecontext.com",
    description: "Story tips, pitches, and requests to correct a published article.",
  },
  {
    label: "Press",
    email: "press@thecontext.com",
    description: "Media inquiries and interview requests.",
  },
];

export default function ContactPage() {
  return (
    <StaticPage
      title="Talk to Us"
      description="Reach the right team directly — we read everything that comes in."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {CONTACT_CHANNELS.map((channel) => (
          <div key={channel.email} className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-foreground">{channel.label}</h3>
            <p className="mt-2 text-sm text-muted">{channel.description}</p>
            <a
              href={`mailto:${channel.email}`}
              className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
            >
              {channel.email}
            </a>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Mailing address</h2>
      <p>
        thecontext
        <br />
        548 Market Street, Suite 1200
        <br />
        San Francisco, CA 94104
      </p>

      <h2>Follow us</h2>
      <div>
        <SocialIcons />
      </div>
    </StaticPage>
  );
}

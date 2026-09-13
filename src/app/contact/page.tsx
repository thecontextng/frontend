import type { Metadata } from "next";
import { SocialIcons } from "@/components/social-icons";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Talk to Us",
  description: "Contact thecontext editorial, press, and general inquiries.",
};

export default function ContactPage() {
  return (
    <StaticPage
      title="Talk to Us"
      description="Reach us directly — we read everything that comes in."
    >
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground">General inquiries, tips & press</h3>
        <p className="mt-2 text-sm text-muted">
          Questions about the site, story tips, corrections, partnerships, or press requests.
        </p>
        <a
          href="mailto:thecontextng@gmail.com"
          className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
        >
          thecontextng@gmail.com
        </a>
        <p className="mt-3 text-sm text-muted">
          <a href="tel:+23408104013872" className="text-accent hover:underline">
            +234 0810 401 3872
          </a>
        </p>
      </div>

      <h2 className="mt-12">Mailing address</h2>
      <p>
        Context Media Nigeria
        <br />
        Queen Palm Street, Karu Federal Housing
        <br />
        Abuja, Nigeria
      </p>

      <h2>Follow us</h2>
      <div>
        <SocialIcons />
      </div>
    </StaticPage>
  );
}

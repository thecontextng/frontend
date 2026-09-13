import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at thecontext.",
};

const OPEN_ROLES = [
  { title: "Staff Reporter, Climate & Environment", location: "Remote (US)", type: "Full-time" },
  { title: "Video Producer, Documentaries", location: "San Francisco, CA", type: "Full-time" },
  { title: "AI & Technology Editor", location: "Remote", type: "Full-time" },
  { title: "Audience & Social Editor", location: "Remote", type: "Contract" },
];

export default function CareersPage() {
  return (
    <StaticPage
      title="Careers"
      description="Help us tell stories that hold up years from now."
    >
      <p>
        thecontext is a small, editorially independent newsroom covering technology, climate,
        health, and long-form documentary work. We hire people who care about getting the story
        right, not just getting it out first.
      </p>

      <h2>Open roles</h2>
      <div className="grid grid-cols-1 gap-4">
        {OPEN_ROLES.map((role) => (
          <div
            key={role.title}
            className="flex flex-col justify-between gap-2 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {role.location} &middot; {role.type}
              </p>
            </div>
            <a
              href="mailto:careers@thecontext.com"
              className="text-sm font-medium text-accent hover:underline"
            >
              Apply
            </a>
          </div>
        ))}
      </div>

      <h2>How to apply</h2>
      <p>
        Send a resume, a short note on why the role interests you, and links to relevant work to{" "}
        <a href="mailto:careers@thecontext.com">careers@thecontext.com</a>. We reply to every
        applicant.
      </p>

      <h2>Equal opportunity</h2>
      <p>
        thecontext is an equal opportunity employer. We do not discriminate on the basis of race,
        color, religion, sex, national origin, age, disability, sexual orientation, gender
        identity, or any other status protected by applicable law.
      </p>
    </StaticPage>
  );
}

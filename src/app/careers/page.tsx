import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at thecontext.",
};

export default function CareersPage() {
  return (
    <StaticPage
      title="Careers"
      description="Help us tell stories that hold up years from now."
    >
      <p>
        thecontext is a small, editorially independent newsroom covering technology, climate,
        health, and long-form documentary work out of Abuja, Nigeria. We hire people who care
        about getting the story right, not just getting it out first.
      </p>

      <h2>Open roles</h2>
      <p>
        We don&apos;t have any open roles right now. If that changes, we&apos;ll list them here.
        In the meantime, you&apos;re welcome to send a general expression of interest with a
        resume and links to relevant work to{" "}
        <a href="mailto:thecontextng@gmail.com">thecontextng@gmail.com</a> — we keep these on
        file and reach out when a relevant role opens.
      </p>

      <h2>Equal opportunity</h2>
      <p>
        thecontext is an equal opportunity employer. We do not discriminate on the basis of race,
        color, religion, sex, national origin, age, disability, or any other status protected by
        applicable law.
      </p>
    </StaticPage>
  );
}

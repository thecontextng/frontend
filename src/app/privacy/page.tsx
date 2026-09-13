import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How thecontext collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" description="Last updated: August 2026">
      <p>
        This Privacy Policy explains how thecontext collects, uses, and protects information
        when you use our website and services.
      </p>

      <h2>Information we collect</h2>
      <p>
        We may collect information you provide directly, such as your name and email address
        when contacting us or subscribing to updates, as well as information collected
        automatically, such as device type, browser, IP address, and pages visited.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use collected information to operate and improve the Service, respond to inquiries,
        send requested updates, understand readership trends, and detect and prevent misuse.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies for essential site functionality, analytics, and
        remembering preferences such as light or dark mode. You can control cookies through your
        browser settings.
      </p>

      <h2>Sharing of information</h2>
      <p>
        We do not sell your personal information. We may share information with service
        providers who help us operate the Service, or when required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct, or delete your
        personal information, or to object to certain processing. To exercise these rights,
        contact us through our <a href="/contact">Contact</a> page.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain personal information only as long as necessary for the purposes described in
        this policy, unless a longer retention period is required by law.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected
        by updating the date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}

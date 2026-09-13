import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How thecontext collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" description="Last updated: September 2026">
      <p>
        This Privacy Policy explains how thecontext, published by Context Media Nigeria (&ldquo;
        thecontext,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), collects, uses, and protects
        information when you use this website. We are based at Queen Palm Street, Karu Federal
        Housing, Abuja, Nigeria, and this policy is written to meet the requirements of the
        Nigeria Data Protection Act, 2023 (&ldquo;NDPA&rdquo;).
      </p>

      <h2>Information we collect</h2>
      <p>We keep the data we collect to what we actually need to run the site:</p>
      <ul>
        <li>
          <strong>Newsletter sign-up:</strong> if you subscribe, we store your email address and
          the date you subscribed, so we can send you updates when we publish new stories.
        </li>
        <li>
          <strong>Contact by email:</strong> if you email us directly, we see whatever you send
          us (your address, name if given, and message content) in our inbox, to respond to you.
        </li>
        <li>
          <strong>Admin accounts:</strong> our editorial staff have login accounts (email, name,
          and a securely hashed password) used only to manage the site&apos;s content.
        </li>
        <li>
          <strong>Basic server logs:</strong> like most websites, our hosting infrastructure
          automatically logs IP address, browser type, and pages requested, for security and
          reliability purposes.
        </li>
      </ul>
      <p>
        We do not run advertising trackers or analytics scripts on this site, and we do not sell
        or rent your personal information to anyone.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use the information above to operate the site, send newsletter updates you&apos;ve
        opted into, respond to messages you send us, and keep the site secure and reliable.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        thecontext itself does not use cookies for advertising or analytics. We use your
        browser&apos;s local storage (not cookies) to remember your light/dark theme preference
        and to keep admin staff signed in — this data stays on your device and is never sent to
        third parties.
      </p>
      <p>
        Some articles embed videos from YouTube. When a YouTube player is loaded or played,
        Google/YouTube may set cookies on your device under their own privacy policy, outside our
        control. See our <a href="/cookies">Cookie Policy</a> for details.
      </p>

      <h2>Sharing of information</h2>
      <p>
        We do not sell your personal information. We may share information with service
        providers who help us operate the Service (for example, our hosting and database
        providers), or when required by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the NDPA, you have the right to know what personal data we hold about you, to
        request a copy of it, to have it corrected, to have it deleted, and to withdraw consent
        (for example, unsubscribing from our newsletter at any time). To exercise any of these
        rights, contact us through our <a href="/contact">Contact</a> page. If you believe we
        have not handled your data properly, you may also lodge a complaint with the Nigeria
        Data Protection Commission (NDPC).
      </p>

      <h2>Data retention</h2>
      <p>
        We retain personal information only as long as necessary for the purposes described in
        this policy — for example, a newsletter subscription until you unsubscribe — unless a
        longer retention period is required by law.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected
        by updating the date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy, or requests about your data, can be sent through our{" "}
        <a href="/contact">Contact</a> page or to{" "}
        <a href="mailto:thecontextng@gmail.com">thecontextng@gmail.com</a>.
      </p>
    </StaticPage>
  );
}

import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How thecontext uses cookies and local storage.",
};

export default function CookiesPage() {
  return (
    <StaticPage title="Cookie Policy" description="Last updated: September 2026">
      <p>
        This page explains how thecontext uses cookies and similar technologies. It should be
        read together with our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>What we use directly</h2>
      <p>
        thecontext does not set any advertising or analytics cookies. Instead, we use your
        browser&apos;s <strong>local storage</strong> — a similar but separate mechanism — for
        two purposes only:
      </p>
      <ul>
        <li>Remembering whether you prefer light or dark mode.</li>
        <li>Keeping editorial staff signed in to the admin panel.</li>
      </ul>
      <p>
        This data stays on your device, is never transmitted to us or any third party, and
        contains no tracking information. Because it is strictly necessary for the site to
        function as you&apos;d expect (and isn&apos;t used for tracking or advertising), no
        consent banner is required for it under applicable law.
      </p>

      <h2>Third-party cookies from embedded video</h2>
      <p>
        Some articles include embedded YouTube videos. We use YouTube&apos;s privacy-enhanced
        embed mode, which limits cookie use until you actually interact with the player. If you
        play an embedded video, Google/YouTube may set their own cookies on your device under{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Google&apos;s Privacy Policy
        </a>
        , outside our control.
      </p>

      <h2>Controlling cookies</h2>
      <p>
        You can clear or block cookies and local storage at any time through your browser
        settings. Blocking local storage may reset your theme preference or sign you out of the
        admin panel; it will not affect your ability to read articles.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}

import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about thecontext.",
};

export default function FaqPage() {
  return (
    <StaticPage title="Frequently Asked Questions">
      <h2>What is thecontext?</h2>
      <p>
        thecontext is a news and documentary outlet covering artificial intelligence and
        technology, the environment and climate, health and human stories, and original video
        reporting.
      </p>

      <h2>Is thecontext free to read?</h2>
      <p>
        Yes. All reporting on thecontext is free to read, with no paywall or subscription
        required.
      </p>

      <h2>How do you fund your reporting?</h2>
      <p>
        thecontext is an independent newsroom. Editorial decisions are made independently of any
        funding source, advertiser, or partner.
      </p>

      <h2>Can I republish or quote your articles?</h2>
      <p>
        In most cases, yes, under specific conditions. See our{" "}
        <a href="/guidelines">Sharing Guidelines</a> for what&apos;s allowed and how to credit us
        correctly.
      </p>

      <h2>How do I report an error in a story?</h2>
      <p>
        Email our editorial team through the <a href="/contact">Contact</a> page with the
        headline, a link to the story, and a description of the issue. We review every
        correction request.
      </p>

      <h2>Do you accept story tips or pitches?</h2>
      <p>
        Yes — we welcome tips, especially for our Video Reports and Documentaries coverage. Reach
        us through the <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}

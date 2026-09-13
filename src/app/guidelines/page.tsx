import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Sharing Guidelines",
  description: "How to quote, share, and republish reporting from thecontext.",
};

export default function GuidelinesPage() {
  return (
    <StaticPage
      title="Sharing Guidelines"
      description="How you can quote, share, and republish our reporting."
    >
      <h2>Sharing links</h2>
      <p>
        You&apos;re always welcome to share links to our stories on social media, in newsletters,
        or on your own site. No permission is needed for linking.
      </p>

      <h2>Quoting our work</h2>
      <p>
        Short excerpts may be quoted for commentary, criticism, or reporting purposes, provided
        the excerpt is clearly attributed to thecontext and links back to the original story.
      </p>

      <h2>Republishing full articles</h2>
      <p>
        Full republication requires written permission. Contact us with the article link, the
        outlet or platform you&apos;d like to republish on, and your intended publish date.
      </p>

      <h2>Using our video reports and documentaries</h2>
      <p>
        Our video content is hosted on YouTube and may be shared via standard embed or link
        sharing. Downloading, re-uploading, or re-editing our video content without permission is
        not permitted.
      </p>

      <h2>Using images and figures</h2>
      <p>
        Images that appear within our articles are credited where required and may not be
        reused independently of the story without separate permission from the rights holder.
      </p>

      <h2>Attribution format</h2>
      <p>
        When quoting or referencing our work, please credit us as{" "}
        <strong>&ldquo;thecontext&rdquo;</strong> with a link to the original article.
      </p>

      <p>
        Questions about a specific use case? Reach out through our <a href="/contact">Contact</a>{" "}
        page.
      </p>
    </StaticPage>
  );
}

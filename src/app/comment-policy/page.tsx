import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Comment Policy",
  description: "Community guidelines for commenting on thecontext.",
};

export default function CommentPolicyPage() {
  return (
    <StaticPage
      title="Comment Policy"
      description="Guidelines for participating in discussion on thecontext."
    >
      <p>
        thecontext does not currently have a public comment section on articles. If commenting
        is enabled in the future, the following guidelines will apply.
      </p>

      <h2>Be respectful</h2>
      <p>
        Disagree with an argument, not with a person. Personal attacks, harassment, and hate
        speech of any kind are not permitted.
      </p>

      <h2>Stay on topic</h2>
      <p>
        Keep comments relevant to the story. Off-topic promotion, spam, and repeated posting of
        the same content will be removed.
      </p>

      <h2>No misinformation</h2>
      <p>
        Comments that knowingly spread false or misleading claims may be removed. If you believe
        a story itself contains an error, please use our <a href="/contact">Contact</a> page
        instead of the comment section.
      </p>

      <h2>Moderation</h2>
      <p>
        Comments are moderated at our discretion. We may remove any comment, and suspend or ban
        any account, that violates this policy or our <a href="/terms">Terms of Service</a>.
        Moderation decisions are not always announced individually.
      </p>

      <h2>Reporting a comment</h2>
      <p>
        If you see a comment that violates this policy, please report it or contact us directly
        so our team can review it.
      </p>
    </StaticPage>
  );
}

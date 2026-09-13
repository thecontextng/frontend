import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of thecontext.",
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service" description="Last updated: September 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of thecontext
        (thecontext.ng), published by Context Media Nigeria, Queen Palm Street, Karu Federal
        Housing, Abuja, Nigeria (the &ldquo;Service&rdquo;). By using the Service, you agree to
        these Terms.
      </p>

      <h2>1. Use of the Service</h2>
      <p>
        You may access and read our content for personal, non-commercial use. Any other use,
        including reproduction, redistribution, or commercial exploitation of our content,
        requires permission under our <a href="/guidelines">Sharing Guidelines</a>.
      </p>

      <h2>2. Newsletter and comments</h2>
      <p>
        If you subscribe to our newsletter, you can unsubscribe at any time. We do not currently
        offer a public comment section; if one is added in the future, posted content will be
        subject to our <a href="/comment-policy">Comment Policy</a>.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All articles, video content, graphics, and branding on thecontext are owned by Context
        Media Nigeria or its licensors and are protected by copyright and other intellectual
        property laws.
      </p>

      <h2>4. Disclaimer of warranties</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; without warranties of any kind. While we aim
        for accuracy, we do not guarantee that all content is complete, current, or error-free.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Context Media Nigeria is not liable for any
        indirect, incidental, or consequential damages arising from your use of the Service.
      </p>

      <h2>6. Governing law</h2>
      <p>
        These Terms are governed by the laws of the Federal Republic of Nigeria, without regard
        to conflict-of-law principles. Any dispute arising from these Terms or the Service will
        be subject to the exclusive jurisdiction of the courts of Nigeria.
      </p>

      <h2>7. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Service after changes
        take effect constitutes acceptance of the revised Terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these Terms can be sent through our <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}

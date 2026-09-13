import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "About",
  description: "About Context Media Nigeria — development journalism, tech, and human stories.",
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Context Media Nigeria"
      description="Development journalism, AI-driven solutions, tech innovations, and the energy transition."
    >
      <p>
        Context Media Nigeria is a digital platform that focuses on development journalism,
        AI-driven solutions, tech innovations and energy transition.
      </p>

      <p>
        The organization also covers climate change, environment, health and human interest
        stories.
      </p>

      <p>
        In addition, it tells stories of Nigerian companies driving production of goods and
        services locally, promoting internal economic growth and job creation.
      </p>

      <h2>Contact</h2>
      <p>
        Mobile:{" "}
        <a href="tel:+23408104013872" className="text-accent hover:underline">
          +234 0810 401 3872
        </a>
        <br />
        Email:{" "}
        <a href="mailto:thecontextng@gmail.com" className="text-accent hover:underline">
          thecontextng@gmail.com
        </a>
        <br />
        Address: Queen Palm Street, Karu Federal Housing, Abuja, Nigeria.
      </p>
    </StaticPage>
  );
}

import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import { CookieNotice } from "@/components/cookie-notice";
import { InlineScript } from "@/components/inline-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "thecontext",
    template: "%s | thecontext",
  },
  description:
    "Reporting and documentary work on the technology, environment, and people shaping what comes next.",
  icons: {
    icon: "/logo-mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript id="theme-init" html={THEME_INIT_SCRIPT} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CookieNotice />
        </Providers>
      </body>
    </html>
  );
}

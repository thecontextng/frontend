export interface SiteLink {
  name: string;
  href: string;
}

export const SUPPORT_LINKS: SiteLink[] = [
  { name: "FAQ", href: "/faq" },
  { name: "Sharing Guidelines", href: "/guidelines" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Comment Policy", href: "/comment-policy" },
];

export const CONTACT_LINKS: SiteLink[] = [
  { name: "Talk to Us", href: "/contact" },
  { name: "Careers", href: "/careers" },
];

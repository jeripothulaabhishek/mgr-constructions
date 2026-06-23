export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Featured Projects", href: "/projects", description: "Explore our premium luxury spaces." },
      { label: "Manikonda Residences", href: "/projects/manikonda-residences", description: "HMDA-approved luxury 3BHKs." },
      { label: "Platinum Enclave", href: "/projects/platinum-enclave", description: "Ultra-luxury premium towers." },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Joint Venture", href: "/jv" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "About MGR", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Joint Ventures", href: "/jv" },
  { label: "Recent Projects", href: "/projects" },
  { label: "Company Blogs", href: "/blog" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

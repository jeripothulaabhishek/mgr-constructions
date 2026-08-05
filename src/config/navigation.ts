export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const MAIN_NAV: NavLink[] = [
  {
    label: "Residences",
    href: "/projects",
    children: [
      { label: "Featured Developments", href: "/projects", description: "Explore our luxury residential portfolio." },
      { label: "Skyline Heights", href: "/projects/skyline-heights", description: "Ultra-luxury 3BHK gated residences." },
      { label: "Golden Horizon", href: "/projects/golden-horizon", description: "Elite architectural sanctuary towers." },
    ],
  },
  { label: "Locations", href: "/#location-section" },
  { label: "Joint Ventures", href: "/jv" },
  { label: "About Us", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "About Prime Estates", href: "/about" },
  { label: "Development Services", href: "/services" },
  { label: "Joint Ventures", href: "/jv" },
  { label: "Featured Projects", href: "/projects" },
  { label: "Industry Insights", href: "/blog" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

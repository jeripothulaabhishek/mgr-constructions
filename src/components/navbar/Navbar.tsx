"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react";
import { COMPANY } from "@/config/company";
import { MAIN_NAV } from "@/config/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Monitor scroll state for glass background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const triggerSiteVisit = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-site-visit"));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 glass-panel shadow-sm border-b border-border-accent"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group text-left">
          <span className="text-xl md:text-2xl font-bold tracking-wider text-text-main uppercase font-headings">
            MGR
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-bold group-hover:text-text-main transition-colors">
            DEVELOPERS
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 font-sans">
          {MAIN_NAV.map((link) => {
            const isActive = pathname === link.href;
            const hasChildren = !!link.children;

            if (hasChildren) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-colors ${
                      activeDropdown === link.label || pathname.startsWith(link.href)
                        ? "text-gold"
                        : "text-text-muted hover:text-text-main"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 glass-panel rounded-xl p-4 shadow-xl border border-border-accent opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    <div className="grid gap-3 text-left">
                      {link.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="group/item flex flex-col p-2.5 rounded-lg hover:bg-alternate/40 transition-colors"
                        >
                          <span className="text-xs font-bold text-text-main uppercase tracking-wider group-hover/item:text-gold transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-[10px] text-text-muted mt-1 font-sans">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xs font-bold tracking-widest uppercase transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 text-text-muted hover:text-gold text-xs transition-colors mr-2 font-sans font-bold"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>{COMPANY.phone}</span>
          </a>
          <button
            onClick={triggerSiteVisit}
            className="px-5 py-2.5 bg-gold text-white rounded-lg text-xs font-bold tracking-widest uppercase hover:bg-text-main hover:text-white transition-all duration-300 shadow-md hover:shadow-gold/10 flex items-center gap-2 group cursor-pointer"
          >
            <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
            Book Site Visit
          </button>
        </div>

        {/* Mobile menu controllers */}
        <div className="lg:hidden flex items-center space-x-4">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="p-2.5 rounded-lg glass-panel text-gold hover:text-text-main transition-colors"
            aria-label="Call MGR Support"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg glass-panel text-text-main hover:text-gold transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[74px] left-0 w-full h-[calc(100vh-74px)] glass-panel z-40 lg:hidden flex flex-col justify-between p-8 border-t border-border-accent transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-5 text-left">
          {MAIN_NAV.map((link) => {
            const hasChildren = !!link.children;
            return (
              <div key={link.label} className="flex flex-col">
                {!hasChildren ? (
                  <Link
                    href={link.href}
                    className="text-base font-bold text-text-main hover:text-gold uppercase tracking-wider font-headings"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-text-muted/50 block mb-2 font-bold font-sans">
                      {link.label}
                    </span>
                    <div className="pl-4 flex flex-col space-y-3.5 border-l border-border-accent mt-1">
                      {link.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="text-sm font-bold text-text-main hover:text-gold uppercase tracking-wide font-headings"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col space-y-3.5 mt-8 font-sans">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-3 justify-center py-3.5 glass-panel-light rounded-xl text-text-main text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-gold" />
            {COMPANY.phone}
          </a>
          <button
            onClick={() => {
              setIsOpen(false);
              triggerSiteVisit();
            }}
            className="w-full py-4 bg-gold text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-text-main transition-all shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Site Visit
          </button>
        </div>
      </div>
    </nav>
  );
}

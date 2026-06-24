"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Calendar } from "lucide-react";
import { COMPANY } from "@/config/company";
import { MAIN_NAV } from "@/config/navigation";

function MagneticButton({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 }); // Subtle 20% tracking
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
      }}
      className={className}
    >
      {children}
    </button>
  );
}

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
          ? "py-5 bg-white/70 backdrop-blur-md shadow-md border-b border-border-accent"
          : "py-8 bg-white/35 backdrop-blur-sm border-b border-border-accent/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group text-left transition-transform duration-300 hover:scale-102">
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
                    className={`flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:text-gold relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-gold after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                      activeDropdown === link.label || pathname.startsWith(link.href)
                        ? "text-gold after:scale-x-100"
                        : "text-text-muted after:scale-x-0"
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
                className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:text-gold relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-gold after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${
                  isActive ? "text-gold after:scale-x-100" : "text-text-muted after:scale-x-0"
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
          <MagneticButton
            onClick={triggerSiteVisit}
            className="px-5 py-2.5 bg-gold text-white rounded-lg text-[10px] font-bold tracking-widest uppercase btn-luxury-shimmer flex items-center gap-2 group cursor-pointer border border-gold/20"
          >
            <Calendar className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            Book Site Visit
          </MagneticButton>
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

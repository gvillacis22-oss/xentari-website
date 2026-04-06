"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, navLinks } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white transition-colors hover:text-accent"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-white"
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute left-0 top-full pt-2">
                        <div className="min-w-[220px] rounded-xl border border-border bg-background-card p-2 shadow-lg">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-background-subtle hover:text-white"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="/contact">Book a Consultation</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background pb-6 lg:hidden">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-white"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label
                          )
                        }
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            openDropdown === link.label && "rotate-180"
                          )}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="bg-background-subtle">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-8 py-3 text-sm text-text-secondary hover:text-white"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 px-4">
                <Button href="/contact" className="w-full justify-center">
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

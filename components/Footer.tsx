"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Utensils, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-card py-20 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pattern-dots opacity-30" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                <Utensils className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight">{siteConfig.name.split(' ')[0]}</span>
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  {siteConfig.name.split(' ')[1]}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground font-medium transition-colors hover:text-primary flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 -ml-6 transition-all group-hover:opacity-100 group-hover:ml-0 text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-foreground">Connect With Us</h4>
            <div className="flex gap-4">
              <Link
                href={siteConfig.socialLinks.facebook}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background border border-border text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:border-transparent"
              >
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link
                href={siteConfig.socialLinks.instagram}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background border border-border text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:border-transparent"
              >
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link
                href={siteConfig.socialLinks.twitter}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background border border-border text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:border-transparent"
              >
                <FaTwitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-8 text-xl font-bold text-foreground">Stay Updated</h4>
            <p className="mb-6 text-muted-foreground">
              Subscribe for exclusive VIP offers and culinary updates.
            </p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-14 rounded-full border-border/50 bg-background/50 backdrop-blur-sm px-6 font-medium focus:ring-primary"
              />
              <Button className="h-14 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent px-8 font-bold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-border/40 pt-10 md:flex-row md:justify-between">
          <p className="text-base font-medium text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-8 text-base font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

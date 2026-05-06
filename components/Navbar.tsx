"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  ShoppingBag, 
  ShoppingCart, 
  Utensils, 
  ChevronRight, 
  MessageCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/store";
import { siteConfig } from "@/config/site";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);

  // Avoid hydration mismatch
  useEffect(() => {
    setItemCount(getItemCount());
  }, [getItemCount]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? "border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 duration-300">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Utensils className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                {siteConfig.name.split(' ')[0]}
              </span>
              <span className="text-[10px] font-medium tracking-widest text-primary uppercase mt-0.5">
                {siteConfig.name.split(' ')[1]}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:transition-all duration-300 ${
                    isActive
                      ? "text-primary after:w-full after:bg-primary"
                      : "text-muted-foreground hover:text-foreground after:w-0 after:bg-primary hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => setCartDrawerOpen(true)}
              variant="ghost"
              size="icon"
              className="relative h-11 w-11 rounded-full border border-border/50 bg-card/50 transition-all hover:border-primary/50"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </Button>
            <Link href="/menu">
              <Button
                size="lg"
                className="group gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu & Cart */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              onClick={() => setCartDrawerOpen(true)}
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl border border-border/50 bg-card/50 text-foreground backdrop-blur-sm"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl border border-border/50 bg-card/50 text-foreground"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex w-[300px] flex-col border-r border-primary/20 bg-background p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="border-b border-border/50 bg-card/40 px-6 py-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                      <Utensils className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold tracking-tight text-foreground">{siteConfig.name.split(' ')[0]}</span>
                      <span className="text-xs font-medium tracking-widest text-primary uppercase">{siteConfig.name.split(' ')[1]}</span>
                    </div>
                  </div>
                </div>

                <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group relative flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary shadow-inner"
                            : "text-muted-foreground hover:bg-card hover:text-foreground"
                        }`}
                      >
                        <span className="relative z-10">{link.name}</span>
                        {isActive && <ChevronRight className="ml-auto h-4 w-4 text-primary" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-border/50 bg-card/50 p-6">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 text-base font-bold text-white shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Support
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CartDrawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen} />
      
      {/* Floating Cart Button for Mobile */}
      <AnimatePresence>
        {itemCount > 0 && !cartDrawerOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={() => setCartDrawerOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 lg:hidden"
          >
            <ShoppingCart className="h-7 w-7" />
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background shadow-lg">
              {itemCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

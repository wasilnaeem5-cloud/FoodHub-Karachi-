"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/store";
import { siteConfig } from "@/config/site";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, increaseQty, decreaseQty, removeItem, getTotal, getItemCount } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col border-l border-primary/20 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/50 bg-card/40 px-6 py-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3 text-2xl font-black tracking-tight text-foreground">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Your Cart
              {getItemCount() > 0 && (
                <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {getItemCount()}
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/50">
                <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Your cart is empty</h3>
              <p className="mb-8 text-muted-foreground">
                Looks like you haven't added any delicious items to your cart yet.
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-full bg-primary px-8 font-bold text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 rounded-2xl border border-border/50 bg-card/40 p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border/50">
                      <Image
                        src={item.image_url || "/images/dish-placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-bold text-foreground line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-border/50 bg-background/50 p-1">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold text-primary">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/50 bg-card/40 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-black text-foreground tracking-tight">
                Rs. {getTotal()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Taxes and delivery fee calculated at checkout
            </p>
            <div className="grid gap-3">
              <Link href="/cart" onClick={() => onOpenChange(false)}>
                <Button variant="outline" className="w-full rounded-xl border-border/50 py-6 font-bold">
                  View Full Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={() => onOpenChange(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-6 font-black text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                  Checkout Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

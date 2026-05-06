"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ShoppingBag, MessageCircle, Home, ArrowRight, Loader2 } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="max-w-2xl w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="rounded-[3rem] border-border/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pattern-dots opacity-20 pointer-events-none" />
          <CardContent className="p-8 md:p-16 text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.3 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </motion.div>

            <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight">Order Received!</h1>
            <p className="text-xl text-muted-foreground font-medium mb-8">
              Thank you for your order. We&apos;ve sent your order details to our WhatsApp team for confirmation.
            </p>

            {orderId && (
              <div className="inline-block px-6 py-3 rounded-full bg-secondary/50 border border-border/50 mb-12">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Order ID: <span className="text-primary font-black ml-2">{orderId}</span>
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:flex sm:justify-center">
              <Link href="/">
                <Button variant="outline" size="lg" className="h-14 w-full sm:w-auto rounded-full px-8 font-bold border-border/50 hover:bg-primary/10">
                  <Home className="mr-2 h-5 w-5" /> Back Home
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" className="h-14 w-full sm:w-auto rounded-full px-8 font-bold bg-gradient-to-r from-primary to-accent">
                  Order More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-border/40">
              <p className="text-muted-foreground font-medium mb-6">Didn&apos;t open WhatsApp?</p>
              <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10 rounded-full h-12">
                <MessageCircle className="mr-2 h-5 w-5" /> Resend WhatsApp Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-secondary/10 flex items-center justify-center py-20 px-4">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Loading Order Details...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

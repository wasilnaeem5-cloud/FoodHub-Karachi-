"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Utensils, Quote, ShoppingBag, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const allReviews = [
  { id: 1, name: "Ahmed Khan", avatar: "AK", rating: 5, date: "May 1, 2026", review: "The best biryani I have ever tasted in Karachi! The layers of flavor, the tender meat, and the aromatic rice - absolute perfection." },
  { id: 2, name: "Sara Ali", avatar: "SA", rating: 5, date: "April 28, 2026", review: "FoodHub never disappoints. Their BBQ platter is legendary - the smoky flavors, the perfect char, and the generous portions." },
  { id: 3, name: "Bilal Ahmed", avatar: "BA", rating: 5, date: "April 20, 2026", review: "The ambiance is warm and inviting, the staff treats you like family, and the food? Simply divine." },
  { id: 4, name: "Zainab R.", avatar: "ZR", rating: 4, date: "April 15, 2026", review: "Really enjoyed the seekh kebabs. They were juicy and perfectly spiced. The naan was soft and fresh." },
  { id: 5, name: "Fahad Y.", avatar: "FY", rating: 5, date: "April 10, 2026", review: "I ordered the Beef Nihari for a weekend breakfast, and it was incredible. Slow-cooked to perfection." },
  { id: 6, name: "Ayesha M.", avatar: "AM", rating: 5, date: "April 5, 2026", review: "Consistently good food. We order from here at least once a week. The Karahi is top tier." },
];

const ratingSummary = {
  overall: 4.8,
  totalReviews: 124,
  breakdown: [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ],
};

function SectionDivider({ variant = "default" }: { variant?: "default" | "ornate" }) {
  if (variant === "ornate") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 py-2">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" /><Utensils className="h-5 w-5 text-primary/60" /><div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
      </motion.div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-12 bg-primary/30" /><div className="h-1.5 w-1.5 rounded-full bg-primary/50" /><div className="h-px w-12 bg-primary/30" />
    </div>
  );
}

export default function ReviewsClient() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <section className="relative overflow-hidden py-20 md:py-32 bg-card">
          <div className="absolute inset-0 pattern-dots opacity-20 mix-blend-overlay" />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Real Stories</span>
              <SectionDivider variant="ornate" />
              <h1 className="mt-6 text-3xl font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                Customer <span className="text-gradient">Reviews</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground/90 font-medium leading-relaxed">
                Don&apos;t just take our word for it. See what our valued guests have to say.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="mx-auto max-w-4xl rounded-[2.5rem] border-border/50 bg-background/40 backdrop-blur-2xl p-8 md:p-14 shadow-2xl">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div className="text-center">
                  <h2 className="text-7xl font-black text-gradient">{ratingSummary.overall}</h2>
                  <div className="my-5 flex justify-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-8 w-8 ${i < 4 ? "fill-primary text-primary" : "text-muted/30"}`} />
                    ))}
                  </div>
                  <p className="text-xl font-bold">Based on {ratingSummary.totalReviews} Reviews</p>
                </div>
                <div className="space-y-4">
                  {ratingSummary.breakdown.map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-4">
                      <span className="flex w-12 items-center gap-2 text-sm font-bold">{bar.stars} <Star className="h-4 w-4 fill-primary text-primary" /></span>
                      <div className="h-2 flex-1 rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${bar.percentage}%` }} />
                      </div>
                      <span className="w-10 text-right text-sm font-medium">{bar.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allReviews.map((testimonial) => (
                <Card key={testimonial.id} className="p-10 border-border/50 bg-card/60 hover:-translate-y-2 transition-all">
                  <Quote className="mb-6 h-10 w-10 text-primary/40" />
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted/30"}`} />
                    ))}
                  </div>
                  <p className="mb-10 text-lg text-muted-foreground italic">&ldquo;{testimonial.review}&rdquo;</p>
                  <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-bold text-white">{testimonial.avatar}</div>
                    <p className="font-bold">{testimonial.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="p-10 md:p-20 text-center rounded-[3rem] border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10">
              <h2 className="text-4xl font-black md:text-6xl tracking-tight">Loved the food? <span className="text-gradient">Order now!</span></h2>
              <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
                <Link href="/menu">
                  <Button size="lg" className="rounded-full px-10 py-7 text-lg font-bold bg-gradient-to-r from-primary to-accent">
                    <ShoppingBag className="mr-2 h-6 w-6" /> View Menu
                  </Button>
                </Link>
                <a href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-full px-10 py-7 text-lg font-bold bg-green-600 text-white">
                    <MessageCircle className="mr-2 h-6 w-6" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

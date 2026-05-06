"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  Utensils,
  MapPin,
  Clock,
  Send,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

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

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <section className="relative overflow-hidden py-20 md:py-32 bg-card">
          <div className="absolute inset-0 pattern-dots opacity-20 mix-blend-overlay" />
          <div className="container relative mx-auto px-4 text-center md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Get in Touch</span>
              <SectionDivider variant="ornate" />
              <h1 className="mt-6 text-3xl font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                Contact <span className="text-gradient">Us</span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground/90 font-medium leading-relaxed">
                We'd love to hear from you. Our team is always here to assist.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 relative">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-black mb-6">Send a Message</h2>
                <Card className="p-8 md:p-12 rounded-[2.5rem] border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl">
                  <form className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Input placeholder="Full Name" className="h-14 rounded-2xl" />
                      <Input placeholder="Phone Number" className="h-14 rounded-2xl" />
                    </div>
                    <Input placeholder="Email Address" className="h-14 rounded-2xl" />
                    <Textarea placeholder="How can we assist you?" className="min-h-[180px] rounded-2xl" />
                    <Button className="h-14 rounded-2xl bg-gradient-to-r from-primary to-accent font-bold text-lg">
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </Button>
                  </form>
                </Card>
              </div>

              <div>
                <h2 className="text-3xl font-black mb-6">Restaurant Info</h2>
                <Card className="p-8 md:p-12 rounded-[2.5rem] border-border/50 bg-card shadow-2xl h-full">
                  <div className="space-y-10">
                    <div className="flex items-start gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><MapPin className="h-8 w-8" /></div>
                      <div>
                        <h3 className="font-bold text-xl">Location</h3>
                        <p className="text-muted-foreground text-lg">{siteConfig.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Phone className="h-8 w-8" /></div>
                      <div>
                        <h3 className="font-bold text-xl">Phone</h3>
                        <p className="text-muted-foreground text-lg">{siteConfig.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Mail className="h-8 w-8" /></div>
                      <div>
                        <h3 className="font-bold text-xl">Email</h3>
                        <p className="text-muted-foreground text-lg">{siteConfig.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-border/40 pt-10">
                      <h3 className="mb-6 flex items-center gap-4 text-2xl font-black"><Clock className="h-7 w-7 text-primary" /> Opening Hours</h3>
                      <div className="space-y-4">
                        {siteConfig.openingHours.map((schedule) => (
                          <div key={schedule.day} className="flex justify-between">
                            <span className="text-muted-foreground">{schedule.day}</span>
                            <span className="font-bold">{schedule.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="overflow-hidden rounded-[3rem] border-border/50 shadow-2xl aspect-video md:aspect-[21/9] bg-secondary flex items-center justify-center">
               <div className="text-center p-10">
                  <MapPin className="mx-auto h-16 w-16 text-primary mb-4" />
                  <h3 className="text-3xl font-black mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">Premium Map Integration Ready</p>
               </div>
            </Card>
          </div>
        </section>
      </main>

      <Link
        href={`https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] px-6 py-5 text-white shadow-2xl transition-all hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="font-bold text-lg">VIP Booking</span>
      </Link>
    </div>
  );
}

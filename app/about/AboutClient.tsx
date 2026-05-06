"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Truck,
    Star,
    MessageCircle,
    ShoppingBag,
    Utensils,
    Award,
    Users,
    Leaf,
    Shield,
    Sparkles,
    Heart,
    Calendar,
    ChefHat,
    Quote
} from "lucide-react";
import { siteConfig } from "@/config/site";

const features = [
    { icon: Award, title: "Premium Quality", description: "Only the finest ingredients sourced from trusted local suppliers" },
    { icon: Shield, title: "Hygienic Kitchen", description: "State-of-the-art facilities with strict hygiene protocols" },
    { icon: Heart, title: "Affordable Prices", description: "Exceptional value without compromising on taste or quality" },
    { icon: Truck, title: "Quick Service", description: "Fast delivery and efficient dine-in service guaranteed" },
];

const chefStats = [
    { value: "10+", label: "Years Experience", icon: Calendar },
    { value: "5000+", label: "Happy Customers", icon: Users },
    { value: "100+", label: "Signature Dishes", icon: Sparkles },
];

const galleryImages = [
    { src: "/images/gallery-1.jpg", alt: "Lamb chops with mint sauce" },
    { src: "/images/gallery-2.jpg", alt: "Tandoori chicken tikka" },
    { src: "/images/gallery-3.jpg", alt: "Restaurant dining experience" },
    { src: "/images/gallery-4.jpg", alt: "Fresh naan bread varieties" },
    { src: "/images/gallery-5.jpg", alt: "Pakistani feast spread" },
    { src: "/images/gallery-6.jpg", alt: "Grilled seafood platter" },
];

const storyHighlights = [
    { icon: Calendar, label: "Since 2018" },
    { icon: Leaf, label: "Fresh Ingredients" },
    { icon: Truck, label: "Fast Delivery" },
];

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

export default function AboutClient() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <main>
                <section className="relative overflow-hidden py-32 md:py-48">
                    <div className="absolute inset-0">
                        <Image src="/images/restaurant-interior.jpg" alt="Restaurant interior" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
                    </div>
                    <div className="container relative mx-auto px-4 md:px-6">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
                            <div className="mb-8 flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 backdrop-blur-sm w-fit shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                                <Heart className="h-4 w-4 text-primary animate-pulse" />
                                <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Our Story</span>
                            </div>
                            <h1 className="mb-8 text-4xl font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                                About <span className="text-gradient">FoodHub Karachi</span>
                            </h1>
                            <p className="text-2xl font-medium text-muted-foreground/90 leading-relaxed">
                                A story of flavor, passion, and unparalleled culinary quality.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-32 relative">
                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Our Journey</span>
                                <SectionDivider />
                                <h2 className="mt-6 text-3xl font-black text-foreground sm:text-4xl md:text-5xl tracking-tight">
                                    From Humble Beginnings to <span className="text-gradient">Culinary Excellence</span>
                                </h2>
                                <div className="mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
                                    <p>FoodHub Karachi was born in 2018 from a simple dream - to bring the authentic flavors of Pakistani cuisine to every doorstep in Karachi.</p>
                                    <p>Our founder, Chef Rashid Ahmed, spent over two decades perfecting traditional recipes passed down through generations. Every dish we serve carries the essence of his dedication.</p>
                                </div>
                                <div className="mt-12 flex flex-wrap gap-5">
                                    {storyHighlights.map((highlight) => (
                                        <div key={highlight.label} className="flex items-center gap-3 rounded-full border border-border/50 bg-card/60 px-6 py-3 backdrop-blur-md shadow-lg">
                                            <highlight.icon className="h-5 w-5 text-primary" />
                                            <span className="font-bold text-foreground">{highlight.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
                                    <Image src="/images/restaurant-interior.jpg" alt="FoodHub interior" fill className="object-cover" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden border-y border-border/40 bg-secondary/10 py-32">
                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            <div className="relative">
                                <div className="aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl">
                                    <Image src="/images/chef.jpg" alt="Chef Rashid" fill className="object-cover" />
                                </div>
                            </div>
                            <div>
                                <Card className="mb-10 border border-border/50 bg-card/60 backdrop-blur-md p-10 shadow-xl">
                                    <p className="text-xl leading-relaxed text-muted-foreground font-medium italic relative">
                                        <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/20" />
                                        &ldquo;Cooking is not just a profession for me - it&apos;s a passion that runs through my veins.&rdquo;
                                    </p>
                                </Card>
                                <div className="grid grid-cols-3 gap-6">
                                    {chefStats.map((stat) => (
                                        <Card key={stat.label} className="p-6 text-center border-border/50 bg-card/60">
                                            <stat.icon className="mx-auto mb-4 h-7 w-7 text-primary" />
                                            <p className="text-2xl font-black text-primary">{stat.value}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-4xl font-black text-foreground">Why Choose <span className="text-gradient">FoodHub</span></h2>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => (
                                <Card key={feature.title} className="p-10 border-border/50 bg-card/60 hover:-translate-y-3 transition-all duration-500">
                                    <feature.icon className="mx-auto mb-8 h-12 w-12 text-primary" />
                                    <h3 className="mb-4 text-2xl font-black">{feature.title}</h3>
                                    <p className="text-muted-foreground font-medium">{feature.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <Card className="p-10 md:p-20 text-center rounded-[3rem] border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/10">
                            <h2 className="text-4xl font-black md:text-6xl tracking-tight">Ready to taste something <span className="text-gradient">amazing?</span></h2>
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

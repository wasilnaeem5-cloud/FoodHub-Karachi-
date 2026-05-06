"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Flame,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  ChevronRight,
  Utensils,
  Pizza,
  Beef,
  Drumstick,
  Soup,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

// Food Categories
const foodCategories = [
  { name: "Pizza", icon: Pizza, color: "from-red-500/20 to-orange-500/20" },
  { name: "BBQ", icon: Flame, color: "from-orange-500/20 to-amber-500/20" },
  { name: "Burgers", icon: Beef, color: "from-amber-500/20 to-yellow-500/20" },
  { name: "Chinese", icon: Soup, color: "from-yellow-500/20 to-orange-500/20" },
  { name: "Desi", icon: Drumstick, color: "from-orange-500/20 to-red-500/20" },
];

const fallbackDishes = [
  { id: "dish-biryani", name: "Chicken Biryani", description: "Aromatic basmati rice layered with tender chicken, saffron & traditional spices", price: 450, rating: 4.9, image_url: "/images/dish-bbq.jpg", category: "Desi" },
  { id: "dish-kebab", name: "Seekh Kebab", description: "Juicy minced meat kebabs grilled on charcoal to smoky perfection", price: 380, rating: 4.8, image_url: "/images/dish-bbq.jpg", category: "BBQ" },
  { id: "dish-karahi", name: "Chicken Karahi", description: "Sizzling chicken in a rich tomato-based gravy with fresh herbs", price: 650, rating: 4.9, image_url: "/images/dish-bbq.jpg", category: "Desi" },
  { id: "dish-bbq", name: "BBQ Platter", description: "Assorted grilled meats - tikka, kebabs, chops with fresh naan", price: 1200, rating: 5.0, image_url: "/images/dish-bbq.jpg", category: "BBQ" },
];

const stats = [
  { value: "15+", label: "Years Excellence" },
  { value: "50k+", label: "Happy Customers" },
  { value: "100+", label: "Signature Dishes" },
  { value: "4.9", label: "Customer Rating" },
];

function SectionDivider({ variant = "default" }: { variant?: "default" | "ornate" }) {
  if (variant === "ornate") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 py-2"
      >
        <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-primary/50" />
        <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary/60" />
        <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-primary/50" />
      </motion.div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-8 sm:w-12 bg-primary/30" />
      <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
      <div className="h-px w-8 sm:w-12 bg-primary/30" />
    </div>
  );
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HomePage() {
  const { addItem } = useCart();
  const [popularDishes, setPopularDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .limit(4);
        
        if (error) throw error;
        setPopularDishes(data && data.length > 0 ? data : fallbackDishes);
      } catch (err) {
        console.error("Error fetching home dishes:", err);
        setPopularDishes(fallbackDishes);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Delicious food spread"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 lg:via-background/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>

          <div className="container relative mx-auto px-4 py-20 md:px-6 z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 backdrop-blur-sm shadow-lg shadow-primary/10">
                <Flame className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-[10px] sm:text-sm font-black tracking-[0.2em] text-primary uppercase">
                  Karachi&apos;s Favorite Since 2009
                </span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 max-w-4xl text-balance text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[5.5rem]"
            >
              Where Every Bite Tells a <span className="text-gradient block sm:inline">Delicious Story</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10 max-w-2xl text-pretty text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed"
            >
              Experience the finest Pakistani cuisine at FoodHub. Fresh ingredients, time-honored recipes, and flavors that transport you home.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/menu">
                <Button size="lg" className="group w-full sm:w-auto h-16 rounded-2xl bg-gradient-to-r from-primary to-accent px-10 text-lg font-black text-primary-foreground shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all">
                  <ShoppingBag className="mr-3 h-5 w-5" /> Order Now
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-md px-10 text-lg font-bold hover:bg-card hover:border-primary transition-all">
                  Explore Menu <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="flex flex-wrap gap-3">
              {foodCategories.map((category) => (
                <Link key={category.name} href={`/menu?category=${category.name.toLowerCase()}`} className={`group flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-5 py-2.5 backdrop-blur-md transition-all hover:scale-105 hover:border-primary/50 shadow-sm`}>
                  <category.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">{category.name}</span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative border-y border-border/40 bg-card py-16 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 pattern-dots opacity-20" />
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <motion.div variants={slideUp} key={stat.label} className="text-center group">
                  <p className="text-3xl font-black text-gradient sm:text-5xl drop-shadow-sm">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Popular Dishes Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16 text-center">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Chef's Recommendations</span>
              <SectionDivider variant="ornate" />
              <h2 className="mt-4 text-3xl font-black text-foreground sm:text-5xl lg:text-6xl tracking-tight">
                Popular <span className="text-gradient">Dishes</span>
              </h2>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : (
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {popularDishes.map((dish) => (
                  <motion.div variants={scaleIn} key={dish.id}>
                    <Card className="group h-full overflow-hidden rounded-[2rem] border-border/50 bg-card/60 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image src={dish.image_url || "/images/dish-bbq.jpg"} alt={dish.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute right-4 top-4">
                          <div className="flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 backdrop-blur-md shadow-lg">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-bold">{dish.rating || "4.8"}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="mb-2 text-xl font-black tracking-tight">{dish.name}</h3>
                        <p className="mb-6 text-sm text-muted-foreground font-medium line-clamp-2">{dish.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-black text-primary">Rs. {dish.price}</span>
                          <Button
                            size="sm"
                            onClick={() => addItem({ ...dish, quantity: 1 })}
                            className="rounded-xl bg-primary px-5 font-bold text-xs"
                          >
                            Add +
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-16 text-center">
              <Link href="/menu">
                <Button variant="outline" className="rounded-full border-2 border-primary/30 h-14 px-10 font-bold hover:bg-primary hover:text-white transition-all">
                  View Full Menu <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="py-24 relative">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <Card className="overflow-hidden rounded-[2.5rem] border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 sm:p-16 shadow-2xl">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                  <div className="text-center lg:text-left">
                    <Badge className="mb-6 bg-primary/20 text-primary hover:bg-primary/30 border-0 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Limited Offer</Badge>
                    <h2 className="mb-6 text-3xl font-black sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                      Weekend Feast <br className="hidden sm:block" />
                      <span className="text-gradient">20% Discount</span>
                    </h2>
                    <p className="mb-10 text-lg text-muted-foreground font-medium">
                      Gather your family and enjoy our legendary BBQ platters at a special price this weekend only.
                    </p>
                    <Link href="/menu">
                      <Button size="lg" className="h-16 rounded-2xl bg-primary px-10 text-lg font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Order Now & Save
                      </Button>
                    </Link>
                  </div>
                  <div className="relative aspect-video lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image src="/images/dish-bbq.jpg" alt="Special Deal" fill className="object-cover" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Info */}
        <section className="py-24 border-t border-border/40 bg-secondary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { icon: MapPin, title: "Location", detail: siteConfig.address },
                { icon: Phone, title: "Phone", detail: siteConfig.phone },
                { icon: Clock, title: "Open Hours", detail: "11:00 AM - 11:00 PM" },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-card border border-border/50 shadow-lg">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


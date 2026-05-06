"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Star,
    Utensils,
    Search,
    Plus,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { useCart } from "@/lib/store";

const categories = [
    { id: "all", name: "All" },
    { id: "pizza", name: "Pizza" },
    { id: "burgers", name: "Burgers" },
    { id: "bbq", name: "BBQ" },
    { id: "chinese", name: "Chinese" },
    { id: "desi", name: "Desi" },
    { id: "drinks", name: "Drinks" },
    { id: "desserts", name: "Desserts" },
];

function SectionDivider({ variant = "default" }: { variant?: "default" | "ornate" }) {
    if (variant === "ornate") {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 py-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
                <Utensils className="h-5 w-5 text-primary/60" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
            </motion.div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px w-12 bg-primary/30" /><div className="h-1.5 w-1.5 rounded-full bg-primary/50" /><div className="h-px w-12 bg-primary/30" />
        </div>
    );
}

export default function MenuClient() {
    const searchParams = useSearchParams();
    const { addItem } = useCart();
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");

    useEffect(() => {
        const category = searchParams.get("category");
        if (category) {
            setActiveCategory(category.toLowerCase());
        }
    }, [searchParams]);

    useEffect(() => {
        async function fetchMenu() {
            setLoading(true);
            setError(null);
            try {
                // Fetching ALL available items from Supabase
                const { data, error: fetchError } = await supabase
                    .from('menu_items')
                    .select('*')
                    .eq('is_available', true);

                if (fetchError) throw fetchError;
                
                setMenuItems(data || []);
            } catch (err: any) {
                console.error("Error fetching menu:", err);
                setError(err.message || "Failed to load menu items. Please check your connection.");
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, []);

    const filteredItems = useMemo(() => {
        let items = [...menuItems];
        if (activeCategory !== "all") {
            items = items.filter((item) => item.category?.toLowerCase() === activeCategory.toLowerCase());
        }
        if (searchQuery) {
            items = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        switch (sortBy) {
            case "price-low": items.sort((a, b) => a.price - b.price); break;
            case "price-high": items.sort((a, b) => b.price - a.price); break;
            case "popular": default: items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
        return items;
    }, [menuItems, activeCategory, searchQuery, sortBy]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Loading Menu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
                <AlertCircle className="h-16 w-16 text-destructive/50" />
                <div>
                    <h2 className="text-2xl font-black mb-2">Oops! Something went wrong</h2>
                    <p className="text-muted-foreground max-w-md">{error}</p>
                </div>
                <Button onClick={() => window.location.reload()} className="rounded-full px-8">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <main>
                <section className="relative overflow-hidden py-24 md:py-32 bg-card">
                    <div className="absolute inset-0 pattern-dots opacity-20 mix-blend-overlay" />
                    <div className="container relative mx-auto px-4 text-center md:px-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Explore Our</span>
                            <SectionDivider variant="ornate" />
                            <h1 className="mt-6 text-3xl font-black text-foreground sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                                Our <span className="text-gradient">Menu</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground/90 font-medium leading-relaxed">
                                Freshly prepared dishes made with passion and the finest ingredients available.
                            </p>
                            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1 group">
                                    <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary z-10" />
                                    <Input
                                        type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-14 rounded-full border-border/50 bg-background/50 pl-14 pr-6 text-lg font-medium"
                                    />
                                </div>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="h-14 sm:w-[220px] rounded-full border-border/50 bg-background/50 text-foreground font-medium px-6">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="border-border/50 bg-card/95 backdrop-blur-xl">
                                        <SelectItem value="popular">Popular</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="sticky top-[80px] z-40 border-y border-border/40 bg-background/80 backdrop-blur-2xl py-4">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                            {categories.map((category) => (
                                <button
                                    key={category.id} onClick={() => setActiveCategory(category.id)}
                                    className={`shrink-0 snap-start rounded-full px-8 py-3 text-sm font-bold tracking-wide uppercase transition-all ${activeCategory === category.id
                                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105"
                                        : "bg-card/50 text-muted-foreground border border-border/50 hover:bg-primary/10"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 relative">
                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        {filteredItems.length === 0 ? (
                            <div className="py-32 text-center">
                                <Utensils className="mx-auto h-16 w-16 text-muted-foreground/30 mb-6" />
                                <p className="text-2xl font-bold text-foreground">No dishes found in this category</p>
                                <Button variant="link" onClick={() => {setActiveCategory("all"); setSearchQuery("");}} className="text-primary font-bold">Clear filters</Button>
                            </div>
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <AnimatePresence mode="popLayout">
                                    {filteredItems.map((item) => (
                                        <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={item.id}>
                                            <Card className="group h-full overflow-hidden rounded-[2.5rem] border-border/50 bg-card/60 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/15 hover:bg-card/90">
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <Image src={item.image_url || "/images/dish-placeholder.jpg"} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    <div className="absolute left-5 top-5">
                                                        <span className="rounded-full bg-background/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md shadow-lg">{item.category}</span>
                                                    </div>
                                                    <div className="absolute right-5 top-5">
                                                        <span className="flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-sm font-bold backdrop-blur-md shadow-lg">
                                                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                                                            <span className="text-foreground">{item.rating || "4.8"}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <CardContent className="p-8 flex flex-col h-full">
                                                    <div className="mb-4 flex items-start justify-between gap-3">
                                                        <h3 className="text-xl font-black text-foreground tracking-tight">{item.name}</h3>
                                                        <span className="shrink-0 text-xl font-black text-primary">Rs.{item.price}</span>
                                                    </div>
                                                    <p className="mb-8 text-sm text-muted-foreground/90 font-medium leading-relaxed flex-1">{item.description}</p>
                                                    <Button onClick={() => addItem({ ...item, quantity: 1 })} className="w-full gap-3 rounded-full bg-secondary/80 py-6 font-bold text-foreground hover:bg-primary hover:text-primary-foreground">
                                                        <Plus className="h-5 w-5" /> Add to Cart
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

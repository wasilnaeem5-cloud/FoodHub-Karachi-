"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBag, MapPin, Phone, User, MessageCircle, Loader2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !loading) {
      router.push("/menu");
    }
  }, [items, router, loading]);

  const deliveryFee = siteConfig.deliveryZones.find((z: any) => z.name === deliveryZone)?.fee || 0;
  const grandTotal = getTotal() + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryZone) {
      alert("Please select a delivery zone");
      return;
    }
    setLoading(true);

    try {
      // 1. Prepare Order Data
      const orderData = {
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.instructions,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: getTotal(),
        delivery_fee: deliveryFee,
        total: grandTotal,
        status: "pending",
      };

      // 2. Save to Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // 3. Generate WhatsApp Message
      const message = `*New Order - FoodHub Karachi*%0A
*Order ID:* ${data.id}%0A
*Customer:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Address:* ${formData.address}%0A
*Zone:* ${deliveryZone}%0A
%0A
*Items:*%0A
${items.map(item => `- ${item.name} x${item.quantity} (Rs. ${item.price * item.quantity})`).join('%0A')}%0A
%0A
*Subtotal:* Rs. ${getTotal()}%0A
*Delivery Fee:* Rs. ${deliveryFee}%0A
*Grand Total:* Rs. ${grandTotal}%0A
%0A
*Instructions:* ${formData.instructions || 'None'}%0A
%0A
Please confirm my order. Thanks!`;

      const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=${message}`;

      // 4. Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // 5. Clear Cart and Redirect
      clearCart();
      router.push(`/checkout/success?id=${data.id}`);
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-secondary/10 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex items-center gap-4">
          <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-bold text-foreground">Checkout</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="rounded-[2.5rem] border-border/50 shadow-xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <form id="checkout-form" onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                      <Input id="name" name="name" required placeholder="Ahmed Ali" value={formData.name} onChange={handleInputChange} className="h-12 rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                      <Input id="phone" name="phone" required placeholder="0300 1234567" value={formData.phone} onChange={handleInputChange} className="h-12 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery Address</Label>
                    <Input id="address" name="address" required placeholder="Flat No. 123, Street 5, Gulshan..." value={formData.address} onChange={handleInputChange} className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Delivery Zone</Label>
                      <Select required onValueChange={setDeliveryZone}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select your area" />
                        </SelectTrigger>
                        <SelectContent>
                          {siteConfig.deliveryZones.map((zone: any) => (
                            <SelectItem key={zone.name} value={zone.name}>
                              {zone.name} (Rs. {zone.fee})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment Method</Label>
                      <RadioGroup defaultValue="cod" className="flex h-12 items-center gap-4 px-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod">Cash on Delivery</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="instructions" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Special Instructions (Optional)</Label>
                    <Input id="instructions" name="instructions" placeholder="Bring extra tissues, don't ring bell..." value={formData.instructions} onChange={handleInputChange} className="h-12 rounded-xl" />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-border/50 shadow-xl overflow-hidden sticky top-24">
              <CardHeader className="bg-primary/5 p-8">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/50">
                          <Image src={item.image_url || "/images/dish-placeholder.jpg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Rs. {item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-bold text-sm text-primary">Rs. {item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Subtotal</span>
                      <span className="font-bold">Rs. {getTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Delivery Fee</span>
                      <span className="font-bold">Rs. {deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t border-dashed border-border/50">
                      <span className="font-black">Total</span>
                      <span className="font-black text-primary">Rs. {grandTotal}</span>
                    </div>
                  </div>

                  <Button
                    form="checkout-form"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-accent font-black text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    {loading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Place Order & WhatsApp
                      </>
                    )}
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest px-4 leading-relaxed">
                    By placing this order, you agree to our terms. Your order will be confirmed on WhatsApp.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

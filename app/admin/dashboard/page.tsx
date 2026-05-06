"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Utensils,
  ShoppingBag,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Loader2,
  Edit,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const CATEGORIES = ["Biryani", "BBQ", "Karahi", "Fast Food", "Deals", "Sides", "Desserts", "Drinks"];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  
  // Menu Item Form State
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [menuForm, setMenuForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    is_available: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchData();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    }
    checkUser();
  }, [router]);

  async function fetchData() {
    // Fetch Orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (ordersData) setOrders(ordersData);

    // Fetch Menu
    const { data: menuData } = await supabase
      .from('menu_items')
      .select('*')
      .order('name');
    if (menuData) setMenuItems(menuData);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image_url: item.image_url,
      is_available: item.is_available ?? true,
    });
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setMenuForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
      is_available: true,
    });
    setImageFile(null);
    setIsSheetOpen(true);
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      let imageUrl = menuForm.image_url;

      // Handle Image Upload to Supabase Storage
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('menu-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      const itemData = {
        name: menuForm.name,
        description: menuForm.description,
        price: parseFloat(menuForm.price),
        category: menuForm.category,
        image_url: imageUrl,
        is_available: menuForm.is_available,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('menu_items')
          .update(itemData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([itemData]);
        if (error) throw error;
      }

      setIsSheetOpen(false);
      setEditingItem(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Failed to save item. Check console for details.");
    } finally {
      setFormLoading(false);
    }
  };

  const deleteMenuItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      if (error) {
        console.error("Error deleting item:", error);
      } else {
        fetchData();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Utensils className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-black tracking-tight leading-none">FoodHub Admin</span>
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Management Console</span>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive font-bold">
            <LogOut className="h-5 w-5" /> Logout
          </Button>
        </div>
      </nav>

      <main className="container mx-auto py-10 px-4 md:px-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
            { label: "Revenue", value: `Rs. ${orders.reduce((sum, o) => sum + (o.total || 0), 0)}`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
            { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Menu Items", value: menuItems.length, icon: Utensils, color: "text-blue-500", bg: "bg-blue-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="rounded-3xl border-border/50 bg-card/60 backdrop-blur-md shadow-lg shadow-black/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="bg-card/60 border border-border/50 p-1 rounded-2xl h-14 inline-flex">
            <TabsTrigger value="orders" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Orders</TabsTrigger>
            <TabsTrigger value="menu" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Menu Items</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="rounded-3xl border-border/50 bg-card/60 backdrop-blur-md overflow-hidden shadow-xl">
              <CardHeader className="p-8 pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black">Order Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-primary/5">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold uppercase tracking-widest text-[10px] px-8">ID</TableHead>
                        <TableHead className="font-bold uppercase tracking-widest text-[10px]">Customer</TableHead>
                        <TableHead className="font-bold uppercase tracking-widest text-[10px]">Total</TableHead>
                        <TableHead className="font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                        <TableHead className="font-bold uppercase tracking-widest text-[10px] text-right px-8">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {orders.map((order) => (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="group hover:bg-primary/5"
                          >
                            <TableCell className="font-mono text-[10px] px-8">#{order.id.substring(0, 6)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-bold text-sm">{order.customer_name}</span>
                                <span className="text-[10px] text-muted-foreground">{order.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell className="font-black text-primary">Rs. {order.total}</TableCell>
                            <TableCell>
                              <Badge className={
                                order.status === "completed" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                order.status === "cancelled" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right px-8">
                              <div className="flex justify-end gap-2">
                                {order.status === "pending" && (
                                  <Button size="sm" className="h-8 rounded-lg bg-green-500 hover:bg-green-600 gap-1 font-bold text-[10px]" onClick={() => updateOrderStatus(order.id, "completed")}>
                                    <CheckCircle2 className="h-3 w-3" /> Complete
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" onClick={() => deleteMenuItem(order.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
             <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-black">Menu Items</h2>
                  <p className="text-sm text-muted-foreground font-medium">Add, edit or delete items from the digital menu</p>
                </div>
                <Button onClick={handleAddNew} className="rounded-2xl h-12 px-6 bg-gradient-to-r from-primary to-accent font-black gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                   <Plus className="h-5 w-5" /> Add New Item
                </Button>
             </div>

             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {menuItems.map((item) => (
                   <Card key={item.id} className="group overflow-hidden rounded-[2rem] border-border/50 bg-card/60 backdrop-blur-md shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                         <img src={item.image_url} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute top-3 right-3 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <Button size="sm" variant="secondary" className="h-9 w-9 p-0 rounded-xl shadow-lg" onClick={() => handleEditItem(item)}>
                               <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" className="h-9 w-9 p-0 rounded-xl shadow-lg" onClick={() => deleteMenuItem(item.id)}>
                               <Trash2 className="h-4 w-4" />
                            </Button>
                         </div>
                      </div>
                      <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <span className="text-primary font-black">Rs.{item.price}</span>
                         </div>
                         <p className="text-xs text-muted-foreground line-clamp-2 mb-4 font-medium">{item.description}</p>
                         <div className="flex items-center justify-between">
                           <Badge variant="outline" className="text-[9px] uppercase tracking-widest font-black py-1">{item.category}</Badge>
                           {!item.is_available && <Badge variant="destructive" className="text-[9px] uppercase tracking-widest font-black py-1">Sold Out</Badge>}
                         </div>
                      </CardContent>
                   </Card>
                ))}
             </div>
          </TabsContent>
        </Tabs>

        {/* Menu Item Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-black">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleMenuSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Item Name</Label>
                  <Input 
                    required 
                    value={menuForm.name} 
                    onChange={(e) => setMenuForm({...menuForm, name: e.target.value})} 
                    className="rounded-xl h-12"
                    placeholder="e.g. Special Chicken Biryani"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Category</Label>
                  <Select 
                    required 
                    value={menuForm.category} 
                    onValueChange={(val) => setMenuForm({...menuForm, category: val})}
                  >
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Price (Rs.)</Label>
                  <Input 
                    required 
                    type="number" 
                    value={menuForm.price} 
                    onChange={(e) => setMenuForm({...menuForm, price: e.target.value})} 
                    className="rounded-xl h-12"
                    placeholder="850"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Description</Label>
                  <Textarea 
                    required 
                    value={menuForm.description} 
                    onChange={(e) => setMenuForm({...menuForm, description: e.target.value})} 
                    className="rounded-xl min-h-[100px]"
                    placeholder="Delicious slow-cooked biryani with aromatic spices..."
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs font-bold uppercase tracking-widest">Item Image</Label>
                  <div className="flex flex-col gap-4">
                    { (menuForm.image_url || imageFile) && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50">
                        <img 
                          src={imageFile ? URL.createObjectURL(imageFile) : menuForm.image_url} 
                          alt="Preview" 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id="image-upload" 
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                        <Label 
                          htmlFor="image-upload" 
                          className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="text-xs font-bold">Upload Image</span>
                        </Label>
                      </div>
                      <div className="flex-1">
                         <Input 
                            placeholder="Or Image URL" 
                            value={menuForm.image_url} 
                            onChange={(e) => setMenuForm({...menuForm, image_url: e.target.value})}
                            className="rounded-xl h-12"
                         />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter className="pt-8">
                <Button 
                  disabled={formLoading} 
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-accent font-black text-lg shadow-lg shadow-primary/20"
                >
                  {formLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (editingItem ? "Update Item" : "Create Item")}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}

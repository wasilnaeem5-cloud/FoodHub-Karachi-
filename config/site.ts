export const siteConfig = {
  name: "FoodHub Karachi",
  description: "Experience the finest cuisine with authentic flavors and premium ingredients.",
  whatsappNumber: "923001234567",
  address: "Block 14, Gulshan-e-Iqbal, Karachi, Pakistan",
  email: "info@foodhubkarachi.com",
  phone: "+92 321 1234567",
  openingHours: [
    { day: "Monday - Thursday", hours: "11:00 AM - 11:00 PM" },
    { day: "Friday - Saturday", hours: "11:00 AM - 12:00 AM" },
    { day: "Sunday", hours: "12:00 PM - 11:00 PM" },
  ],
  socialLinks: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
  },
  deliveryZones: [
    { name: "Gulshan", fee: 150 },
    { name: "DHA", fee: 350 },
    { name: "Clifton", fee: 300 },
    { name: "Saddar", fee: 200 },
  ],
};

export type SiteConfig = typeof siteConfig;

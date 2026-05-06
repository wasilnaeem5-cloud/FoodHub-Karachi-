import type { Metadata } from 'next'
import MenuClient from './MenuClient'

export const metadata: Metadata = {
  title: 'Menu | FoodHub Karachi - Delicious Pakistani & BBQ Cuisine',
  description: 'Explore our extensive menu featuring authentic Biryani, succulent BBQ, rich Karahis, and more. Order online for the best taste in Karachi.',
}

export default function MenuPage() {
  return <MenuClient />
}

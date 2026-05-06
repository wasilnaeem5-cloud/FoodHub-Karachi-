import type { Metadata } from 'next'
import MenuClient from './MenuClient'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Menu | FoodHub Karachi - Delicious Pakistani & BBQ Cuisine',
  description: 'Explore our extensive menu featuring authentic Biryani, succulent BBQ, rich Karahis, and more. Order online for the best taste in Karachi.',
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <MenuClient />
    </Suspense>
  )
}

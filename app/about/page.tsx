import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'Our Story | FoodHub Karachi - Passion for Culinary Excellence',
  description: 'Learn about the journey of FoodHub Karachi, our values, and the master chef behind our authentic Pakistani flavors. Since 2018.',
}

export default function AboutPage() {
  return <AboutClient />
}

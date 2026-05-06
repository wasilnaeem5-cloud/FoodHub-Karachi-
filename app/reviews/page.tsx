import type { Metadata } from 'next'
import ReviewsClient from './ReviewsClient'

export const metadata: Metadata = {
  title: 'Customer Reviews | What People Say About FoodHub Karachi',
  description: 'Read real stories and testimonials from our valued guests. See why FoodHub is the top-rated restaurant in Karachi for authentic taste.',
}

export default function ReviewsPage() {
  return <ReviewsClient />
}

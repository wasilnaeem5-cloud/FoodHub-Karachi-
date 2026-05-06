import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | FoodHub Karachi - Reservations & Support',
  description: 'Get in touch with FoodHub Karachi for reservations, catering inquiries, or feedback. We are here to serve you at our Gulshan location.',
}

export default function ContactPage() {
  return <ContactClient />
}

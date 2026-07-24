/**
 * Thoughts / FAQ data — sourced from the central config.
 * To add or edit thoughts, open: src/lib/config.ts → THOUGHTS array.
 */
import { THOUGHTS } from '@/lib/config'

export interface FAQ {
  id: string
  question: string
  answer: string
}

// Re-export so existing components (FAQCard, BlogsListClient, etc.) continue to work
export const faqs: FAQ[] = THOUGHTS

// Alias for blogs page compatibility
export const blogs = faqs

export const getFAQById = (id: string): FAQ | undefined =>
  faqs.find((faq) => faq.id === id)

// Alias for blog pages
export const getBlogById = getFAQById

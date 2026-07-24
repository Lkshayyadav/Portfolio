import { Metadata } from 'next'
import { PERSONAL } from '@/lib/config'

export const metadata: Metadata = {
  title: `Thoughts | ${PERSONAL.name}`,
  description: 'Technical writings and thoughts on web development, AI, and more.',
  openGraph: {
    title: `Thoughts | ${PERSONAL.name}`,
    description: 'Technical writings and thoughts on web development, AI, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Thoughts | ${PERSONAL.name}`,
    description: 'Technical writings and thoughts on web development, AI, and more.',
  },
}
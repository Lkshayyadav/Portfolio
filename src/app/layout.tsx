import type { Metadata } from 'next'
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollToTop } from '@/components/ui/ScrollAnimations'
import GradualBlur from '@/components/GradualBlur'
import FloatingDock from '@/components/FloatingDock'
import OnekoCat from '@/components/OnekoCat'
import LenisProvider from '@/components/LenisProvider'
import CommandPalette from '@/components/CommandPalette'
import FloatingDecorations from '@/components/FloatingDecorations'
import { PERSONAL } from '@/lib/config'

const hkGrotesk = Hanken_Grotesk({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-hk-grotesk',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL(PERSONAL.domain),
  title: {
    default: `${PERSONAL.name} — Full Stack Developer`,
    template: `%s | ${PERSONAL.name}`,
  },
  description: PERSONAL.metaDescription,
  authors: [{ name: PERSONAL.name }],
  creator: PERSONAL.name,
  openGraph: {
    url: PERSONAL.domain,
    siteName: `${PERSONAL.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: PERSONAL.ogImage,
        width: 1200,
        height: 630,
        alt: `${PERSONAL.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PERSONAL.name} — Full Stack Developer`,
    description: PERSONAL.metaDescription,
    images: [PERSONAL.ogImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hkGrotesk.className} ${instrumentSerif.variable} bg-dotted-grid bg-radial-glow antialiased selection:bg-sky-500/20 selection:text-sky-300`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <FloatingDecorations />
            <div className="relative z-10">{children}</div>
            <FloatingDock />
            <CommandPalette />
            <OnekoCat />
            <GradualBlur
              position="bottom"
              height="5rem"
              target="page"
              zIndex={1}
              strength={2}
              divCount={5}
            />
            <ScrollToTop />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

'use client'

import Image from 'next/image'

interface BannerSectionProps {
  quote?: string
  bannerImage?: string
}

export default function BannerSection({
  quote = "You make your own luck if you stay at it long enough.",
  bannerImage = "/banner.jpg"
}: BannerSectionProps) {
  return (
    <div className="w-full mb-2 relative z-0">
      <div className="relative overflow-hidden rounded-b-2xl sm:rounded-2xl" style={{ height: 'auto' }}>
        <Image
          alt="Banner"
          width={1240}
          height={900}
          className="w-full h-[200px] sm:h-[270px] object-cover"
          src={bannerImage}
          style={{ color: 'transparent', minHeight: '100px' }}
          priority
        />
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center px-4">
          <p className="text-white text-base sm:text-xl italic font-[family-name:var(--font-instrument-serif)] text-center drop-shadow-md">{quote}</p>
        </div>
      </div>
    </div>
  )
}

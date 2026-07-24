'use client'

import { FaLinkedin, FaXTwitter, FaGithub, FaFileArrowDown, FaLink } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import Image from 'next/image'
import * as React from 'react'
import { PERSONAL, SOCIALS } from '@/lib/config'
import SocialPreviewHover from './SocialPreviewHover'

export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-6 relative z-20 px-4 sm:px-8">
      {/* Top Avatar & Name Header */}
      <div className="flex items-end sm:items-center gap-4 sm:gap-6 -mt-10 sm:-mt-12">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 relative z-20 rounded-2xl overflow-hidden bg-cover bg-center shrink-0 border-2 border-neutral-300 dark:border-neutral-800 shadow-xl"
          role="img"
          aria-label={PERSONAL.name}
          style={{ backgroundImage: `url("${PERSONAL.profileImage}")` }}
        />
        <div className="flex flex-col pt-2 sm:pt-4">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            Hi, I&apos;m {PERSONAL.name}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold" title="Verified">
              ✓
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono mt-1">
            {PERSONAL.age}y • cs • full-stack
          </p>
        </div>
      </div>

      {/* Inline Tech Bio Paragraph with Badges & Underline (CEX removed) */}
      <div className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
        I&apos;m a{' '}
        <span className="font-semibold underline decoration-neutral-400 underline-offset-4">
          Full Stack Developer
        </span>{' '}
        building high-performance, scalable applications. I use{' '}
        <span className="inline-flex items-center gap-1 font-medium bg-neutral-200/80 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50">
          <Image src="/tech-icons/react.svg" alt="React" width={14} height={14} className="w-3.5 h-3.5 inline" unoptimized /> React
        </span>{' '}
        to build frontends,{' '}
        <span className="inline-flex items-center gap-1 font-medium bg-neutral-200/80 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50">
          <Image src="/tech-icons/express.svg" alt="Express" width={14} height={14} className="w-3.5 h-3.5 inline dark:invert" unoptimized /> Express
        </span>{' '}
        and{' '}
        <span className="inline-flex items-center gap-1 font-medium bg-neutral-200/80 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50">
          <Image src="/tech-icons/nodejs.svg" alt="Node.js" width={14} height={14} className="w-3.5 h-3.5 inline" unoptimized /> Node.js
        </span>{' '}
        for backends, and databases like{' '}
        <span className="inline-flex items-center gap-1 font-medium bg-neutral-200/80 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50">
          <Image src="/tech-icons/postgresql.svg" alt="PostgreSQL" width={14} height={14} className="w-3.5 h-3.5 inline" unoptimized /> PostgreSQL
        </span>{' '}
        and{' '}
        <span className="inline-flex items-center gap-1 font-medium bg-neutral-200/80 dark:bg-neutral-800/80 px-2 py-0.5 rounded-md text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-300/50 dark:border-neutral-700/50">
          <Image src="/tech-icons/mongodb.svg" alt="MongoDB" width={14} height={14} className="w-3.5 h-3.5 inline" unoptimized /> MongoDB
        </span>
        .
      </div>

      {/* Book A Call Button */}
      <div>
        <a
          href={PERSONAL.ctaUrl || 'mailto:lakshayyadav1010@gmail.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300/80 dark:border-neutral-700/80 rounded-lg shadow-sm transition-all"
        >
          <span>Book A Call!</span>
          <span>🌐</span>
        </a>
      </div>

      {/* Here are my socials */}
      <div className="flex flex-col gap-2.5 pt-2">
        <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
          Here are my socials
        </span>
        <div className="flex flex-wrap gap-2 items-center">
          {SOCIALS.github && (
            <SocialPreviewHover
              href={SOCIALS.github}
              label="GitHub"
              icon={<FaGithub />}
              previewImage="/assets/socials/github.png"
              handle="@Lkshayyadav"
              subtitle="Full Stack"
            />
          )}

          {SOCIALS.twitter && (
            <SocialPreviewHover
              href={SOCIALS.twitter}
              label="Twitter"
              icon={<FaXTwitter />}
              previewImage="/assets/socials/twitter.png"
              handle="@LakshayYadav21"
              subtitle="Building in Public"
            />
          )}

          {SOCIALS.linkedin && (
            <SocialPreviewHover
              href={SOCIALS.linkedin}
              label="LinkedIn"
              icon={<FaLinkedin />}
              previewImage="/assets/socials/linkedin.png"
              handle="Lakshay Yadav"
              subtitle="Open to Work"
            />
          )}

          {SOCIALS.linktree && (
            <SocialPreviewHover
              href={SOCIALS.linktree}
              label="Linktree"
              icon={<FaLink />}
              previewImage="/assets/socials/linktree.png"
              handle="lakshay-yadav"
              subtitle="All Links"
            />
          )}

          {SOCIALS.email && (
            <a
              href={SOCIALS.email}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/80 rounded-full transition-colors"
            >
              <IoMdMail className="text-sm" />
              <span>Email</span>
            </a>
          )}

          {PERSONAL.resumePath && (
            <a
              href={PERSONAL.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              download={PERSONAL.resumeDownloadName}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700/80 rounded-full transition-colors"
            >
              <FaFileArrowDown className="text-sm" />
              <span>Resume</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

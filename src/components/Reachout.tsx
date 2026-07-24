'use client'

import { FaLinkedin, FaXTwitter, FaGithub, FaFileArrowDown, FaLink } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import { Tooltip } from './ui/tooltip-card'
import { VisitorCount } from './VisitorCount'
import { PERSONAL, SOCIALS, FOOTER } from '@/lib/config'
import SocialPreviewHover from './SocialPreviewHover'

export default function Reachout() {
  return (
    <div className="sm:px-12 px-4 pb-24 sm:pb-28">
      <div className="text-left w-full">
        <div className="mb-4 sm:mb-6">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-lg sm:text-xl mb-2 opacity-30 mt-4 sm:mt-6">
            Let&apos;s connect
          </h2>
          <p className="opacity-40 text-md sm:text-lg mb-3 sm:mb-4">
            Here are my socials
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-2.5 sm:gap-3 items-center">
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
            <Tooltip content="Send Email">
              <a
                className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 dark:bg-[#121215] hover:bg-neutral-200 dark:hover:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-800/80 rounded-full transition-all"
                href={SOCIALS.email}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoMdMail className="text-[18px] text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  Email
                </span>
              </a>
            </Tooltip>
          )}

          {PERSONAL.resumePath && (
            <Tooltip content="Download Resume">
              <a
                className="flex items-center gap-2 px-3.5 py-2 bg-neutral-100 dark:bg-[#121215] hover:bg-neutral-200 dark:hover:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-800/80 rounded-full transition-all"
                href={PERSONAL.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                download={PERSONAL.resumeDownloadName}
              >
                <FaFileArrowDown className="text-[18px] text-neutral-800 dark:text-neutral-200 shrink-0" />
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  Resume
                </span>
              </a>
            </Tooltip>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="text-sm dark:text-white/50 text-black/50 text-center sm:text-left">
              <p>{FOOTER.credit}</p>
              <p>© {FOOTER.year}. All rights reserved.</p>
            </div>
            <VisitorCount />
          </div>
        </div>
      </div>
    </div>
  )
}

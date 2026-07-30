'use client';

import { Project } from '@/types/project'
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useSoundFX } from '@/hooks/useSoundFX';

interface MasonryProjectCardProps {
  project: Project;
  className?: string;
}

export const MasonryProjectCard = ({ project, className = "" }: MasonryProjectCardProps) => {
  const { playHover, playClick } = useSoundFX()
  const liveTarget = project.liveLink || project.githubLink || `/projects/${project.id}`

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      onMouseEnter={playHover}
      className={`flex flex-col justify-between h-full p-4 bg-white/70 dark:bg-[#121215]/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl transition-all duration-300 ease-out hover:border-sky-500/40 dark:hover:border-sky-500/40 hover:shadow-2xl dark:hover:shadow-black/50 ${className}`}
    >
      <div className="flex flex-col gap-3">
        {/* Top Thumbnail Image */}
        <Link
          href={liveTarget}
          target={liveTarget.startsWith('http') ? '_blank' : undefined}
          rel={liveTarget.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={playClick}
          className="relative overflow-hidden rounded-xl w-full aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 group block"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} project cover`}
              width={1200}
              height={750}
              className="rounded-xl w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              quality={85}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-xl" />
          )}

          {/* Overlay Status Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{project.status || 'Completed'}</span>
          </div>
        </Link>

        {/* Title & Date Row */}
        <div className="flex items-start justify-between gap-2 pt-1">
          <Link
            href={liveTarget}
            target={liveTarget.startsWith('http') ? '_blank' : undefined}
            rel={liveTarget.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={playClick}
            className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {project.title}
            </h3>
          </Link>
          {project.date && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono shrink-0 mt-0.5">
              {project.date}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200/50 dark:border-neutral-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 mt-auto">
        <Link
          href={liveTarget}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700/90 border border-neutral-300/80 dark:border-neutral-700/80 rounded-lg transition-all"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-800 rounded-lg transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

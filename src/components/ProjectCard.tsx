'use client';

import { Project } from '@/types/project'
import { FaGithub } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { ProjectNavigation } from './ProjectNavigation';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ProjectCardProps {
  project: Project;
  isDetailed?: boolean;
  allProjects?: Project[];
}

export const ProjectCard = ({ project, isDetailed = false, allProjects = [] }: ProjectCardProps) => {

  if (!isDetailed) {
    return (
      <Link
        href={`/projects/${project.id}`}
        className="group block touch-manipulation active:opacity-75"
        style={{
          WebkitTapHighlightColor: 'transparent',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <div className="py-2 text-base sm:text-lg md:text-xl pb-4 sm:pb-5 border-b border-neutral-600 dark:border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-400 group-hover:pl-2">
          <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
            {project.title}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <article className="w-full max-w-none px-4 sm:px-0">
      <header className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {project.isNew && (
              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shrink-0">
                New
              </span>
            )}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-medium wrap-break-word">{project.title}</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.liveLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    className="bg-neutral-200 border-2 border-black dark:bg-neutral-800 dark:border-neutral-500 p-1.5 rounded-full hover:opacity-70 touch-manipulation active:opacity-75"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <FiArrowUpRight className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View live site
                </TooltipContent>
              </Tooltip>
            )}
            {project.githubLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    className="bg-neutral-200 border-2 border-black dark:bg-neutral-800 dark:border-neutral-500 p-1.5 rounded-full hover:opacity-70 touch-manipulation active:opacity-75"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    <FaGithub className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  View on GitHub
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-neutral-100 border-2 border-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Media Section - Fixed Container */}
      {project.image && (
        <div className="mb-6 sm:mb-8">
          <div className="w-full aspect-video relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 70vw, 60vw"
              quality={95}
              priority
            />
          </div>
        </div>
      )}

      {/* Content Section - Fixed Container */}
      <div className="mb-6 sm:mb-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="text-sm sm:text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
            {project.longDescription ? (
              project.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-neutral-600 dark:text-neutral-400 mb-4 last:mb-0">
                  {paragraph}
                  {index === 0 && project.tweetUrl && (
                    <>
                      {' '}
                      <Link
                        href={project.tweetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 dark:text-cyan-600 hover:underline touch-manipulation active:opacity-75"
                      >
                        you can view the tweet here
                      </Link>
                    </>
                  )}
                </p>
              ))
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {project.description}
                {project.tweetUrl && (
                  <>
                    {' '}
                    <Link
                      href={project.tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 dark:text-cyan-600 hover:underline touch-manipulation active:opacity-75"
                    >
                      you can view the tweet here
                    </Link>
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Key Features List (if available) */}
        {project.features && project.features.length > 0 && (
          <div className="mt-6 p-4 sm:p-6 bg-white/60 dark:bg-[#121215]/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Key Features & Engineering</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-sky-500 shrink-0 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Screenshots Gallery (if available) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-6 sm:mt-8 space-y-3">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Screenshots & UI Previews</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((shot, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden aspect-video border border-neutral-200 dark:border-neutral-800 group">
                  <Image
                    src={shot}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isDetailed && allProjects.length > 0 && (
        <ProjectNavigation currentProject={project} allProjects={allProjects} />
      )}
    </article>
  );
};

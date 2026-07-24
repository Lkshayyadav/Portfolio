/**
 * ============================================================
 *  PORTFOLIO CONFIGURATION — Single Source of Truth
 * ============================================================
 *  Edit this file or files inside /src/data/ to update content.
 *  No UI code needs to be touched for content changes.
 *
 *  Asset paths (relative to /public):
 *    Profile photo      →  /assets/images/profile/profile.jpg
 *    Banner image       →  /assets/images/profile/banner.jpg
 *    About-me photo     →  /assets/images/profile/about-me.jpg
 *    Project thumbnails →  /assets/images/projects/<filename>
 *    Project screenshots→  /assets/images/projects/<filename>
 *    Experience logos   →  /assets/images/experience/<filename>
 *    Resume PDF         →  /assets/resume/resume.pdf
 * ============================================================
 */

import {
  HERO_BIO,
  CLOSING_BIO,
  HERO_TITLE,
  BANNER_QUOTE,
  CTA_QUOTE,
  CTA_QUOTE_AUTHOR,
  CTA_TEXT,
  CTA_URL,
  CTA_PRE_TEXT,
} from '@/data/bio'
import { aboutData } from '@/data/about'
import { socialsData } from '@/data/socials'

// ─── Personal Info ────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Lakshay Yadav',
  shortName: 'Lakshay',
  /** Shown beneath the name in the profile header */
  age: '21',
  /** Sub-line shown next to age */
  title: HERO_TITLE,
  /** Hero intro paragraph — focuses on Who I Am & Dev background */
  bio: HERO_BIO,
  /** Closing paragraph — focuses on goals, philosophy & opportunities */
  closingBio: CLOSING_BIO,
  /** Short quote shown on the banner image */
  bannerQuote: BANNER_QUOTE,
  /** Quote shown in the CTA section */
  ctaQuote: CTA_QUOTE,
  ctaQuoteAuthor: CTA_QUOTE_AUTHOR,
  /** CTA button text and link */
  ctaText: CTA_TEXT,
  ctaUrl: CTA_URL,
  /** Text shown above CTA button / closing section */
  ctaPreText: CTA_PRE_TEXT,
  /** Meta description for SEO / OG cards */
  metaDescription:
    'Portfolio of Lakshay Yadav — Full-Stack Developer, Backend Engineer, and Open Source contributor. B.Tech CSE student building production-grade applications.',
  /** Used in sitemap & OpenGraph */
  domain: 'https://lakshayyadav.dev',
  /** GitHub username — used for the contribution calendar */
  githubUsername: 'Lkshayyadav',
  /** Path to profile photo (relative to /public) */
  profileImage: '/assets/images/profile/profile.jpg',
  /** Path to banner image (relative to /public) */
  bannerImage: '/assets/images/profile/banner.jpg',
  /** Path to about-me section image (relative to /public) */
  aboutImage: '/assets/images/profile/about-me.jpg',
  /** Resume — stored locally; clicking "Download" serves this file directly */
  resumePath: '/assets/resume/resume.pdf',
  resumeDownloadName: 'Lakshay_Yadav_Resume.pdf',
  /** OpenGraph / Twitter card image */
  ogImage: '/assets/images/profile/og-image.png',
}

// ─── Social Links ─────────────────────────────────────────────────────────────

export const SOCIALS = socialsData

// ─── Typing Words (hero subtitle animation) ────────────────────────────────────

export const TYPING_WORDS = [
  'Full-Stack Developer',
  'Backend Engineer',
  'Open Source Contributor',
  'AI Practitioner',
]

// ─── Tech Stack Marquee ───────────────────────────────────────────────────────

export const TECH_STACK = [
  // Languages
  { name: 'JavaScript', category: 'language', icon: '/tech-icons/javascript.svg' },
  { name: 'TypeScript', category: 'language', icon: '/tech-icons/typescript.svg' },
  { name: 'C++', category: 'language', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
  
  // Frontend
  { name: 'React.js', category: 'framework', icon: '/tech-icons/react.svg' },
  { name: 'Next.js', category: 'framework', icon: '/tech-icons/nextjs.svg' },
  { name: 'HTML5', category: 'frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg' },
  { name: 'CSS3', category: 'frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', category: 'framework', icon: '/tech-icons/tailwind.svg' },
  { name: 'Framer Motion', category: 'frontend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/framermotion/framermotion-original.svg' },
  
  // Backend
  { name: 'Node.js', category: 'framework', icon: '/tech-icons/nodejs.svg' },
  { name: 'Express.js', category: 'framework', icon: '/tech-icons/express.svg' },
  { name: 'REST APIs', category: 'backend', icon: '/tech-icons/fastapi.svg' },
  { name: 'JWT Auth', category: 'backend', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/json/json-original.svg' },
  
  // Databases
  { name: 'MongoDB', category: 'database', icon: '/tech-icons/mongodb.svg' },
  { name: 'PostgreSQL', category: 'database', icon: '/tech-icons/postgresql.svg' },
  { name: 'Prisma ORM', category: 'framework', icon: '/tech-icons/prisma.svg' },
  { name: 'Redis', category: 'database', icon: '/tech-icons/redis.svg' },

  // Developer Tools
  { name: 'Git', category: 'tool', icon: '/tech-icons/Git.svg' },
  { name: 'GitHub', category: 'tool', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg' },
  { name: 'Postman', category: 'tool', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg' },
  { name: 'Turborepo', category: 'tool', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/turborepo/turborepo-original.svg' },
  { name: 'Vercel', category: 'tool', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original.svg' },
  { name: 'Render', category: 'tool', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/render/render-original.svg' },

  // Concepts & Real-time
  { name: 'WebSockets', category: 'concept', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg' },
  { name: 'WebRTC', category: 'concept', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/webrtc/webrtc-original.svg' },
]

// ─── About Section ────────────────────────────────────────────────────────────

export const ABOUT = aboutData

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceItem {
  company: string
  position: string
  duration: string
  description: string
  achievements?: string[]
  href?: string
  logoUrl?: string
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Prodigy InfoTech',
    position: 'Web Development Intern',
    duration: '2024',
    description: 'Developed responsive web applications and full-stack features.',
    achievements: [
      'Built interactive web application modules using HTML5, CSS3, JavaScript, and React',
      'Integrated RESTful APIs and optimized state management for responsive user experience',
      'Collaborated on modern UI development and cross-browser compatibility',
    ],
    href: 'https://www.linkedin.com/company/prodigy-infotech/',
    logoUrl: '/assets/images/experience/prodigy.png',
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  liveLink?: string
  githubLink?: string
  image: string
  screenshots?: string[]
  tags: string[]
  features?: string[]
  date?: string
  status?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'cex',
    title: 'CEX — Centralized Asset Exchange',
    description:
      'A production-grade centralized exchange with real-time order book, matching engine, and live trading charts.',
    longDescription: `CEX is a full-stack centralized exchange built with Next.js, Express.js, and Redis.
It features a high-performance in-memory matching engine, real-time WebSocket-driven order book
and trade feed, Prisma + PostgreSQL for persistence, and JWT-based authentication.`,
    liveLink: 'https://github.com/Lkshayyadav/CEX',
    githubLink: 'https://github.com/Lkshayyadav/CEX',
    image: '/assets/projects/cex/dashboard.png',
    screenshots: ['/assets/projects/cex/dashboard.png'],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    date: '2026',
    status: 'Completed',
    features: [
      'In-memory order matching engine',
      'Real-time WebSocket order book',
      'JWT authentication',
      'Trade history & candlestick charts',
      'Balance management',
    ],
  },
  {
    id: 'job-tracker',
    title: 'JobTrack — Career Search Dashboard',
    description:
      'A full-stack job application tracking system to organize, manage, and monitor your career pipeline efficiently.',
    longDescription:
      'Job Tracker helps developers track application status, interview schedules, notes, and follow-ups in a clean dashboard with active application breakdown and platform analytics.',
    liveLink: 'https://github.com/Lkshayyadav/JOB-TRACKER',
    githubLink: 'https://github.com/Lkshayyadav/JOB-TRACKER',
    image: '/assets/projects/job-tracker/dashboard.png',
    screenshots: ['/assets/projects/job-tracker/dashboard.png'],
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    date: '2026',
    status: 'Completed',
    features: ['Kanban board view', 'Pipeline status breakdown', 'Applications by platform analytics', 'Follow-up reminders'],
  },
  {
    id: 'second-brain',
    title: 'Brainly — Second Brain Workspace',
    description:
      'Organize your digital mind with Brainly. A premium modern SaaS workspace to store YouTube videos, GitHub repos, Twitter threads, & PDFs in one hub.',
    longDescription:
      'Brainly is a premium, modern SaaS workspace built for productivity. Safely store resources, articles, notes, and media to retrieve them instantly with live website snapshots, Notion-style tags, and collapsible custom collections.',
    liveLink: 'https://github.com/Lkshayyadav/Second-brain',
    githubLink: 'https://github.com/Lkshayyadav/Second-brain',
    image: '/assets/projects/brainly/dashboard.png',
    screenshots: ['/assets/projects/brainly/dashboard.png'],
    tags: ['TypeScript', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    date: '2026',
    status: 'Completed',
    features: [
      'Store YouTube, GitHub, Twitter & PDFs in one hub',
      'Keep notes and documents organized with Notion-style tags',
      'Instant visual previews with live website snapshots',
      'Estimate reading time automatically & search across collections',
    ],
  },
  {
    id: 'elevate-ai',
    title: 'ElevateAI — Recruitment & Interview Platform',
    description:
      'Prepare Smarter. Interview Better. An intelligent framework that breaks down targeted job specifications, cross-references engineering stack, and creates review tracks.',
    longDescription:
      'ElevateAI leverages modern LLMs to assist candidates and developers with interview preparation, automated job spec analysis, and structured review tracks.',
    liveLink: 'https://github.com/Lkshayyadav/ElevateAI',
    githubLink: 'https://github.com/Lkshayyadav/ElevateAI',
    image: '/assets/projects/elevate-ai/dashboard.png',
    screenshots: ['/assets/projects/elevate-ai/dashboard.png'],
    tags: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    date: '2026',
    status: 'Completed',
    features: ['Job spec analysis', 'Targeted review tracks', 'Interactive practice interview flow', 'Custom AI prompts'],
  },
  {
    id: 'github-watcher',
    title: 'RepoChecker — GitHub Repository Checker',
    description:
      'It\'s like checking repos mid-analysis. Paste any GitHub URL and get instant, beautiful insights powered by GitHub API, Gemini AI, and Portia AI.',
    longDescription:
      'RepoChecker connects via GitHub REST/GraphQL APIs and LLM analysis engines to parse stars, activity, contributors, README highlights, and intelligent code recommendations in real-time.',
    liveLink: 'https://github.com/Lkshayyadav/GitHubWatcher',
    githubLink: 'https://github.com/Lkshayyadav/GitHubWatcher',
    image: '/assets/projects/repo-checker/dashboard.png',
    screenshots: ['/assets/projects/repo-checker/dashboard.png'],
    tags: ['Node.js', 'TypeScript', 'GitHub API', 'Gemini AI', 'Portia AI', 'Chart.js', 'Tailwind'],
    date: '2026',
    status: 'Completed',
    features: ['Live Repo Insights', 'Gemini AI code highlights', 'Portia AI security & architecture review', 'Repo comparison mode'],
  },
]

// ─── Thoughts / FAQs ──────────────────────────────────────────────────────────

export interface Thought {
  id: string
  question: string
  answer: string
}

export const THOUGHTS: Thought[] = [
  {
    id: 'building-in-public',
    question: 'Why I Build in Public',
    answer: `Building in public keeps me accountable and forces clarity.

When I document what I'm working on, I think more carefully about my decisions.
When I share progress, I get feedback faster.
When I admit what broke, I learn what actually went wrong.`,
  },
  {
    id: 'ai-as-tool',
    question: 'How I Use AI as a Tool, Not a Crutch',
    answer: `AI is not my replacement — it's my force multiplier.

I use AI for exploring approaches, writing boilerplate, and stress-testing ideas.
If I can't explain a piece of code in simple words, it doesn't go into production.`,
  },
]

// ─── Spotify / Music Player ───────────────────────────────────────────────────

export const MUSIC = {
  enabled: false,
  trackUrl: 'https://open.spotify.com/',
  albumArt: '/assets/images/music/album-art.jpg',
  songName: 'Song Name',
  artists: 'Artist Name',
  audioSrc: '',
}

// ─── Sound Effects ────────────────────────────────────────────────────────────

export const SOUNDS_ENABLED = false

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  credit: 'Made with ♡ by Lakshay Yadav',
  year: '2026',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  video?: string;
  image?: string;
  screenshots?: string[];
  features?: string[];
  liveLink?: string;
  githubLink?: string;
  tags: string[];
  date?: string;
  status?: string;
  tweetUrl?: string;
  isNew?: boolean;
}

export type Locale = 'en' | 'es';
export type ProjectStatus = 'Production' | 'Prototype' | 'Research' | 'In Progress' | 'Open Source' | 'Coming Soon';
export type ProjectCategory = 'Backend' | 'AI' | 'Cloud' | 'Architecture' | 'Full Stack' | 'Automation';

export type Project = {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionEs: string;
  longDescriptionEn: string;
  longDescriptionEs: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  architectureUrl?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  featured: boolean;
  image?: string;
  year: string;
  repoStats?: { stars?: number; language?: string; updatedAt?: string };
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  language?: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  htmlUrl: string;
  homepage?: string;
  fork: boolean;
};

export type CodeSnippet = {
  id: string;
  title: string;
  descriptionEn: string;
  descriptionEs: string;
  language: string;
  code: string;
  category: 'backend' | 'architecture' | 'ai' | 'cloud' | 'data';
  technologies: string[];
  repository?: string;
  sourceUrl?: string;
  highlightLines?: number[];
};

export type Architecture = {
  id: string;
  nameEn: string;
  nameEs: string;
  summaryEn: string;
  summaryEs: string;
  decisionEn: string;
  decisionEs: string;
  tradeoffsEn: string;
  tradeoffsEs: string;
  tech: string[];
};

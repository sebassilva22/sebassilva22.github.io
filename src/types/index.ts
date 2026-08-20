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


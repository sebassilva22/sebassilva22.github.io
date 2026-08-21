import type { Repository } from '../types';

const USERNAME = 'sebassilva22';
const CACHE_KEY = 'juan-portfolio-github-repositories';
const CACHE_TTL = 1000 * 60 * 30;

type GithubRepository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  homepage: string | null;
  fork: boolean;
};

const mapRepository = (repo: GithubRepository): Repository => ({
  id: repo.id,
  name: repo.name,
  description: repo.description || 'Open source experiment by Juan Sebastian Silva Rojas.',
  language: repo.language || undefined,
  topics: repo.topics || [],
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  updatedAt: repo.updated_at,
  htmlUrl: repo.html_url,
  homepage: repo.homepage || undefined,
  fork: repo.fork
});

export async function getGithubRepositories(signal?: AbortSignal): Promise<Repository[]> {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as { at: number; repositories: Repository[] };
      if (Date.now() - parsed.at < CACHE_TTL) return parsed.repositories;
    } catch {
      sessionStorage.removeItem(CACHE_KEY);
    }
  }

  const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal
  });
  if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
  const repositories = (await response.json() as GithubRepository[]).map(mapRepository).filter((repo) => !repo.fork);
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repositories }));
  return repositories;
}

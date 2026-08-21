import { useEffect, useState } from 'react';
import type { Repository } from '../types';
import { getGithubRepositories } from '../services/github';

type GithubState = { repositories: Repository[]; loading: boolean; error: boolean };

export function useGithubRepositories(fallback: Repository[]) {
  const [state, setState] = useState<GithubState>({ repositories: fallback, loading: true, error: false });

  useEffect(() => {
    const controller = new AbortController();
    getGithubRepositories(controller.signal)
      .then((repositories) => setState({ repositories, loading: false, error: false }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ repositories: fallback, loading: false, error: true });
      });
    return () => controller.abort();
  }, [fallback]);

  return state;
}

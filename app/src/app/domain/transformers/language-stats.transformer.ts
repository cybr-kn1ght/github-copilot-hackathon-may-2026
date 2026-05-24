import { LanguageStat, RepoStats } from '../models/github.model';

export function computeLanguageStats(repos: RepoStats[]): LanguageStat[] {
  const languageCounts: { [key: string]: number } = {};
  const validRepos = repos.filter((r) => r.language);

  validRepos.forEach((repo) => {
    const lang = repo.language!;
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });

  const total = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  return Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8);
}

export function getTopRepos(repos: RepoStats[], limit: number = 5): RepoStats[] {
  return repos
    .filter((r) => r.stars >= 0)
    .sort((a, b) => {
      const scoreA = a.stars * 2 + a.forks;
      const scoreB = b.stars * 2 + b.forks;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

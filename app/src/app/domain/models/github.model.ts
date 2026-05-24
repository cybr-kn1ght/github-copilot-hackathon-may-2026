export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  company: string | null;
}

export interface RepoStats {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updated_at: string;
}

export interface ActivityStats {
  total_contributions: number;
  commits: number;
  pull_requests: number;
  issues_opened: number;
  code_reviews: number;
  contribution_streak: number;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export interface DeveloperSummary {
  summary: string;
  generated_at: string;
}

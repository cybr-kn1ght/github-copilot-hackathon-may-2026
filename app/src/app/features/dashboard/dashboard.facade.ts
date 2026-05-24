import { Injectable, Inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GITHUB_REPOSITORY, AI_REPOSITORY } from '../../core/tokens/repository.tokens';
import { GitHubUser, RepoStats, ActivityStats, LanguageStat, DeveloperSummary } from '../../domain/models/github.model';
import { IGitHubRepository, IAiRepository } from '../../core/tokens/repository.tokens';
import { computeLanguageStats, getTopRepos } from '../../domain/transformers/language-stats.transformer';
import { computeActivityStats, GitHubEvent } from '../../domain/transformers/activity.transformer';

export interface DashboardState {
  user: GitHubUser | null;
  repos: RepoStats[];
  activity: ActivityStats | null;
  languages: LanguageStat[];
  topRepos: RepoStats[];
  summary: DeveloperSummary | null;
  loading: boolean;
  error: string | null;
}

@Injectable()
export class DashboardFacade {
  private readonly underConstructionSummary: DeveloperSummary = {
    summary: 'AI summary is under construction. Please check back soon.',
    generated_at: new Date().toISOString(),
  };

  private readonly initialState: DashboardState = {
    user: null,
    repos: [],
    activity: null,
    languages: [],
    topRepos: [],
    summary: null,
    loading: true,
    error: null,
  };

  readonly state = signal<DashboardState>(this.initialState);

  constructor(
    @Inject(GITHUB_REPOSITORY) private github: IGitHubRepository,
    @Inject(AI_REPOSITORY) private ai: IAiRepository
  ) {}

  loadDeveloper(username: string): void {
    this.state.set({ ...this.initialState, loading: true });

    forkJoin({
      user: this.github.getUser(username),
      repos: this.github.getRepos(username),
      events: this.github.getEvents(username),
    }).subscribe({
      next: (data: { user: GitHubUser; repos: RepoStats[]; events: GitHubEvent[] }) => {
        const { user, repos, events } = data;
        const activity = computeActivityStats(events);
        const languages = computeLanguageStats(repos);
        const topRepos = getTopRepos(repos);

        this.state.set({
          user,
          repos,
          activity,
          languages,
          topRepos,
          summary: this.underConstructionSummary,
          loading: false,
          error: null,
        });
      },
      error: (err: { message?: string }) => {
        this.state.set({
          ...this.initialState,
          loading: false,
          error: err.message || 'Failed to load developer',
        });
      },
    });
  }

  private fetchAiSummary(user: GitHubUser, repos: RepoStats[], activity: ActivityStats, languages: LanguageStat[]): void {
    const payload = {
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
      },
      repos: repos.slice(0, 20),
      activity,
      languages,
    };

    this.ai.analyzeDeveloper(payload).subscribe({
      next: (summary: DeveloperSummary) => {
        this.state.update((s: DashboardState) => ({ ...s, summary }));
      },
      error: (err: unknown) => {
        console.warn('AI summary failed, continuing without it', err);
      },
    });
  }
}
